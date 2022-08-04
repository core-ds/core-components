#!/bin/bash

# выхожу, если одна из команд завершилась неудачно
set -e

cd dist

npm version "$VERSION" --no-git-tag-version

npm publish --userconfig "../.npmrc" --tag beta
