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
    --scope @balafla/core-components-vars \
    --scope @balafla/core-components-themes \
    -- "$copy_css"

# собираю пакет themes
lerna exec --scope @balafla/core-components-themes -- node $(pwd)/bin/build-themes.mjs

# экспорт CSS-переменных в JS-переменные
lerna exec --scope @balafla/core-components-vars -- node $(pwd)/bin/export-css-custom-properties-as-js-vars.mjs

# собираю все подпакеты с компонентами
lerna exec --concurrency $CONCURRENCY \
    --ignore @balafla/core-components-codemod \
    -- rollup -c $(pwd)/rollup.config.mjs --silent

# удаляем неиспользуемые css-переменные из сборки во всех подпакетах
lerna exec --concurrency $CONCURRENCY \
    --ignore @balafla/core-components-grid \
    --ignore @balafla/core-components-themes \
    --ignore @balafla/core-components-vars \
    -- node $(pwd)/bin/purgecss.mjs
