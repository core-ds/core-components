#!/usr/bin/env bash
# Запускайте отдельным процессом: bash tools/code-connect/publish-web-core.sh
set +x
set -euo pipefail

if [[ "${BASH_SOURCE[0]}" != "$0" ]]; then
    printf '%s\n' 'Запустите этот файл через bash, а не через source.' >&2
    return 2
fi

cc_repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd -P)"
cd -- "$cc_repo_root"

cc_temp_dir=''
cc_prompt_active=0
cleanup() {
    local cc_exit_status=$?
    trap - EXIT
    unset FIGMA_ACCESS_TOKEN
    if [[ "$cc_prompt_active" -eq 1 ]]; then
        printf '\n' >&2
    fi
    if [[ -n "$cc_temp_dir" ]]; then
        rm -rf -- "$cc_temp_dir"
    fi
    exit "$cc_exit_status"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
trap 'exit 129' HUP

if [[ -z "${FIGMA_ACCESS_TOKEN:-}" ]] && { [[ ! -t 0 ]] || [[ ! -t 2 ]]; }; then
    printf '%s\n' 'FIGMA_ACCESS_TOKEN не задан. Для скрытого ввода запустите скрипт в интерактивном терминале.' >&2
    exit 2
fi

cc_cli=(node "$cc_repo_root/node_modules/@figma/code-connect/bin/figma")
if [[ ! -f "${cc_cli[1]}" ]]; then
    printf '%s\n' 'Не найден установленный CLI @figma/code-connect в node_modules.' >&2
    exit 2
fi

umask 077
cc_temp_dir="$(mktemp -d "${TMPDIR:-/tmp}/figma-web-core.XXXXXX")"

# parse — локальная операция. Проверка обновлений отключена; токен ей не нужен.
cc_parse_status=0
env -u FIGMA_ACCESS_TOKEN "${cc_cli[@]}" connect parse \
    --config figma.web-core.config.json \
    --skip-update-check \
    --exit-on-unreadable-files \
    --outFile "$cc_temp_dir/parsed.json" >"$cc_temp_dir/parse.log" 2>&1 || cc_parse_status=$?
if [[ "$cc_parse_status" -ne 0 ]]; then
    cat "$cc_temp_dir/parse.log" >&2
    exit "$cc_parse_status"
fi

env -u FIGMA_ACCESS_TOKEN node - "$cc_temp_dir/parsed.json" docs/code-connect-web-core.json figma.web-core.config.json <<'NODE'
const fs = require('node:fs');
const assert = require('node:assert/strict');
const [parsedPath, registryPath, configPath] = process.argv.slice(2);
const expectedCount = 148;
const expectedFile = 'lGWq8DtnUcSkRasagBuwq6';
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const parsed = readJson(parsedPath);
const registry = readJson(registryPath);
const config = readJson(configPath).codeConnect;

function nodeId(value) {
    assert.equal(typeof value, 'string', 'В реестре отсутствует nodeId');
    const normalized = value.replace(/-/g, ':');
    assert.match(normalized, /^\d+:\d+$/, 'Некорректный nodeId');
    return normalized;
}

assert(Array.isArray(parsed), 'CLI должен вернуть массив документов');
assert.equal(parsed.length, expectedCount, 'Ожидалось ровно 148 документов');
assert.equal(registry.figmaFile, expectedFile, 'Другой Figma-файл в реестре');
assert.equal(registry.config, 'figma.web-core.config.json', 'Другой конфиг в реестре');
assert.equal(registry.templateCount, expectedCount, 'Количество шаблонов в реестре изменилось');
assert.equal(config.label, 'React', 'Метка конфига должна быть React');
assert(Array.isArray(config.include), 'В конфиге отсутствует список include');
assert.equal(config.include.length, expectedCount, 'include должен содержать 148 файлов');
assert.equal(new Set(config.include).size, expectedCount, 'Повтор файла в include');

assert(Array.isArray(registry.components), 'В реестре отсутствуют components');
const prepared = registry.components.filter((entry) => entry.status === 'prepared');
assert.equal(prepared.length, expectedCount, 'В реестре должно быть 148 prepared-записей');
const registryNodes = new Set(prepared.map((entry) => nodeId(entry.nodeId)));
assert.equal(registryNodes.size, expectedCount, 'Повтор nodeId в реестре');
assert.deepEqual(
    [...new Set(prepared.map((entry) => entry.file))].sort(),
    [...config.include].sort(),
    'Список файлов конфига не совпадает с prepared-реестром',
);

const parsedNodes = new Set();
for (const document of parsed) {
    const url = new URL(document.figmaNode);
    assert.equal(url.protocol, 'https:', 'Ожидался HTTPS URL Figma');
    assert(['www.figma.com', 'figma.com'].includes(url.hostname), 'Другой хост Figma');
    const file = /^\/(?:design|file)\/([^/]+)(?:\/|$)/.exec(url.pathname);
    assert(file, 'Некорректный URL Figma');
    assert.equal(file[1], expectedFile, 'Документ ссылается на другой Figma-файл');
    const id = nodeId(url.searchParams.get('node-id'));
    assert(!parsedNodes.has(id), 'Повтор Figma nodeId в результате parse');
    parsedNodes.add(id);
    assert.equal(document.label, 'React', 'Все документы должны иметь label React');
    assert.equal(document.templateData?.isParserless, true, 'Найден документ не parserless');
    assert.equal(typeof document.template, 'string', 'Отсутствует текст шаблона');
    assert(document.template.trim(), 'Пустой шаблон');
}
assert.equal(parsedNodes.size, expectedCount, 'Ожидалось 148 уникальных узлов');
assert.deepEqual([...parsedNodes].sort(), [...registryNodes].sort(), 'Узлы parse не совпадают с реестром');
console.error('Локальная проверка пройдена: 148 уникальных parserless-шаблонов React для Web :: Core.');
NODE

printf '%s\n' \
    'Будет выполнена публикация 148 шаблонов React в Web :: Core.' \
    '--force заменяет конфликтующие связи, созданные через интерфейс Figma; вручную отключать их не нужно.' \
    'Команда:' \
    '  node node_modules/@figma/code-connect/bin/figma connect publish --config figma.web-core.config.json --skip-update-check --exit-on-unreadable-files --batch-size 20 --force' >&2

if [[ -z "${FIGMA_ACCESS_TOKEN:-}" ]]; then
    cc_prompt_active=1
    printf 'Введите FIGMA_ACCESS_TOKEN (ввод скрыт): ' >&2
    if ! IFS= read -r -s FIGMA_ACCESS_TOKEN; then
        printf '\n%s\n' 'Ввод токена прерван. Публикация не запускалась.' >&2
        cc_prompt_active=0
        exit 2
    fi
    printf '\n' >&2
    cc_prompt_active=0
    if [[ -z "$FIGMA_ACCESS_TOKEN" ]]; then
        printf '%s\n' 'Пустой токен. Публикация не запускалась.' >&2
        exit 2
    fi
fi
export FIGMA_ACCESS_TOKEN

cc_publish_status=0
"${cc_cli[@]}" connect publish \
    --config figma.web-core.config.json \
    --skip-update-check \
    --exit-on-unreadable-files \
    --batch-size 20 \
    --force || cc_publish_status=$?
exit "$cc_publish_status"
