#!/bin/bash

# удаляем неиспользуемые css-переменные из сборки в root-пакете
node --max-old-space-size=4096 bin/purgecss.js

# удаляем неиспользуемые css-переменные из сборки во всех подпакетах
lerna exec --parallel -- node ../../bin/purgecss.js
