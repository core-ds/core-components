#!/bin/bash

set -e

$(pwd)/bin/copy-component-preview.sh

node $(pwd)/bin/prebuild-storybook.mjs
