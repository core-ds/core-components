#!/bin/bash

set -e

rimraf dist build coverage .storybook/public/images/*-preview-snap.png package-sizes.json

lerna exec \
  -- rimraf *.tsbuildinfo dist .rollup.cache **/__diff_output__ package-size.json

lerna exec \
  --scope @alfalab/core-components-themes \
  --scope @alfalab/core-components-vars \
  -- rimraf src/*.ts
