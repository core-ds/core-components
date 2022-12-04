#!/bin/bash

ROLLUP_CONFIG_PATH="rollup.config.mjs"
rollup -c ${LERNA_ROOT_PATH}/${ROLLUP_CONFIG_PATH} --silent
