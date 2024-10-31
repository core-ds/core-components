#!/bin/bash

t0=$(date +%s)

component=$(pwd | sed 's/.*\///')
echo "~ Building $component"

ROLLUP_CONFIG_PATH="rollup.config.mjs"
rollup -c ${LERNA_ROOT_PATH}/${ROLLUP_CONFIG_PATH} --silent

t1=$(date +%s)
echo "+ Built $component in $((t1 - t0))s"
