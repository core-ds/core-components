#!/bin/bash

check_error () {
  if [ ! "$?" -eq "0" ]
  then
    docker stop playwright;
    exit 1;
  fi
}

if [ ! -d "./build" ]
then
    yarn build-storybook-from-dist
    check_error
fi

docker run --name playwright -d -it --rm --ipc=host -v $(pwd):/core-components -w /core-components  mcr.microsoft.com/playwright:v1.27.1-jammy

check_error

docker exec playwright bash -c "apt-get update; apt-get install fonts-roboto -y; apt-get install -y fonts-dejavu-core; fc-cache -fv"

check_error

docker exec -d playwright yarn serve-storybook

check_error

docker exec playwright yarn jest --config=jest.screenshots.config.js "$@"

check_error

docker stop playwright
