#!/bin/bash

if [ ! -d "./build" ]
then
    yarn build-storybook-from-dist
fi

docker run --name playwright -d -it --rm --ipc=host -v $(pwd):/core-components -w /core-components  mcr.microsoft.com/playwright:v1.27.1-jammy

docker exec playwright bash -c "apt-get update; apt-get install fonts-roboto -y; apt-get install -y fonts-dejavu-core; fc-cache -fv"

docker exec -d playwright yarn serve-storybook

docker exec playwright yarn jest --config=jest.screenshots.config.js "$@"

docker stop playwright

if [ "$?" -eq "0" ]
then
  exit 0;
else
  exit 1;
fi
