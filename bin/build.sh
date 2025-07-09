#!/bin/bash
# выхожу, если одна из команд завершилась неудачно
set -e

# удаляю билды
yarn clean

# устанавливаем ограничение на количество параллельных процессов при сборке (default - 10)
CONCURRENCY=${BUILD_CONCURRENCY:=10}

echo "start build on $CONCURRENCY parallel process"

# собираю css пакеты
copy_css="yarn copyfiles -u 1 \"src/**/*.{css,js}\" dist"
lerna exec \
    --scope @alfalab/core-components-vars \
    --scope @alfalab/core-components-themes \
    -- "$copy_css"

# собираю пакет themes
lerna exec --scope @alfalab/core-components-themes -- node $(pwd)/bin/build-themes.mjs

# собираю пакет vars
lerna exec --scope @alfalab/core-components-vars -- node $(pwd)/bin/build-vars.mjs

# собираю все подпакеты с компонентами
lerna exec --concurrency $CONCURRENCY \
    --ignore @alfalab/core-components-codemod \
    --ignore @alfalab/core-components-env \
    --ignore @alfalab/core-components-screenshot-utils \
    --ignore @alfalab/core-components-test-utils \
    -- rollup -c $(pwd)/rollup.config.mjs --silent

# удаляем неиспользуемые css-переменные из сборки во всех подпакетах
lerna exec --concurrency $CONCURRENCY \
    --ignore @alfalab/core-components-grid \
    --ignore @alfalab/core-components-themes \
    --ignore @alfalab/core-components-vars \
    -- node $(pwd)/bin/purgecss.mjs
