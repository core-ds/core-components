#!/bin/bash

set -e

lerna exec \
  $(cat "$(pwd)/bin/analyze-package-sizes/ignored-packages" | xargs -I {} echo --ignore {}) \
  -- node $(pwd)/bin/analyze-package-sizes/analyze-package-size.mjs

node $(pwd)/bin/analyze-package-sizes/analyze-package-sizes.mjs
