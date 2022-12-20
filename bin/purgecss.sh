#!/bin/bash

# удаляем неиспользуемые css-переменные из сборки во всех подпакетах
lerna exec --concurrency 10 node ../../bin/purgecss.js
