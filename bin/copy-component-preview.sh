#!/bin/bash

lerna exec -- node $(pwd)/bin/copy-component-preview.mjs --to $(pwd)/.storybook/public/images
