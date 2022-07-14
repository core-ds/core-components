#!/bin/bash

# удаляем неиспользуемые css-переменные из сборки в root-пакете
node --max-old-space-size=4096 bin/purgecss.js

# удаляем неиспользуемые css-переменные из сборки во всех подпакетах
lerna exec --parallel \
    --ignore @alfalab/core-components-vars \
    --ignore @alfalab/core-components-themes \
    --ignore @alfalab/core-components-grid \
    --ignore @alfalab/core-components-toast-plate \
    -- node ../../bin/purgecss.js
