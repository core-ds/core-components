#!/bin/bash

lerna exec \
    --no-bail \
    --stream \
    --ignore @alfalab/core-components \
    --ignore @alfalab/core-components-codemod \
    --ignore @alfalab/core-components-env \
    --ignore @alfalab/core-components-screenshot-utils \
    --ignore @alfalab/core-components-scrollbar \
    --ignore @alfalab/core-components-test-utils \
    --ignore @alfalab/core-components-themes \
    --ignore  @alfalab/core-components-vars \
    -- node "$(pwd)/bin/lint-deps.mjs"
