#!/bin/bash

lerna exec \
  --ignore @alfalab/core-components \
  --ignore @alfalab/core-components-codemod \
  --ignore @alfalab/core-components-env \
  --ignore @alfalab/core-components-config \
  --ignore @alfalab/core-components-screenshot-utils \
  --ignore @alfalab/core-components-stack-context \
  --ignore @alfalab/core-components-test-utils \
  --ignore @alfalab/core-components-themes \
  --ignore @alfalab/core-components-types \
  --ignore @alfalab/core-components-vars \
  -- node $(pwd)/bin/write-vars-and-themes-version.mjs
