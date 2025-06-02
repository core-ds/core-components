#!/bin/bash

PLAYWRIGHT_VERSION=1.33.0
CONTAINER_NAME='playwright-'$PLAYWRIGHT_VERSION''

check_error () {
  if [ ! "$?" -eq "0" ]
  then
    docker stop $CONTAINER_NAME;
    exit 1;
  fi
}

if [ ! -d "./build" ]
then
    yarn build-storybook-from-dist
    check_error
fi


if [ ! "$(docker ps -a -q -f name=^/${CONTAINER_NAME}$)" ]
  then
    # Если контейнера нет, то создаем новый
    docker run --name $CONTAINER_NAME -d -it --ipc=host -v "$(pwd)":/core-components -w /core-components  mcr.microsoft.com/playwright:v$PLAYWRIGHT_VERSION-jammy
    check_error
    docker exec $CONTAINER_NAME bash -c "apt-get update; apt-get install fonts-inter -y; fc-cache -f"

  else
    # Если контейнер есть, то запускаем существующий
    docker start $CONTAINER_NAME
  fi

check_error

docker exec -d $CONTAINER_NAME yarn serve-storybook

check_error

docker exec $CONTAINER_NAME yarn jest --config=jest.screenshots.config.mjs "$@"

check_error

docker stop $CONTAINER_NAME
