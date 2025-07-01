#!/bin/bash

exit_codes=()

eslint bin tools --ext .cjs,.mjs,.js --max-warnings 0

exit_codes+=($?)

lerna exec \
    --no-bail \
    --stream \
    $(cat "$(pwd)/tools/eslint/ignored-packages" | xargs -I {} echo --ignore {}) \
    -- eslint src --ext .ts,.tsx,.js,.jsx --max-warnings 0 --config $(pwd)/.eslintrc.cjs

exit_codes+=($?)

for exit_code in "${exit_codes[@]}"; do
    if [ $exit_code -ne 0 ]; then
        exit 1
    fi
done
