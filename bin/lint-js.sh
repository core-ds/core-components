#!/bin/bash

lerna exec \
    --no-bail \
    --stream \
    --ignore @alfalab/core-components-codemod \
    --ignore @alfalab/core-components-themes \
    --ignore @alfalab/core-components-vars \
    -- eslint src --ext .ts,.tsx,.js,.jsx --max-warnings 0 --config $(pwd)/.eslintrc.cjs
