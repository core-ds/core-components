#!/bin/bash

lerna exec \
    --no-bail \
    --stream \
    --ignore @alfalab/core-components-bank-card \
    --ignore @alfalab/core-components-screenshot-utils \
    --ignore @alfalab/core-components-test-utils \
    --ignore @alfalab/core-components-themes \
    --ignore @alfalab/core-components-vars \
    -- node $(pwd)/bin/non-existent-css-vars.mjs
