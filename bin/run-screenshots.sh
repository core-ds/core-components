#!/bin/bash

CONTAINER_NAME='playwright'

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
    docker run --name $CONTAINER_NAME -d -it --ipc=host -v "$(pwd)":/core-components -w /core-components  mcr.microsoft.com/playwright:v1.28.1-jammy
    check_error
    docker exec $CONTAINER_NAME bash -c "apt-get update; apt-get install fonts-roboto -y; apt-get install -y fonts-dejavu-core; fc-cache -f"

  else
    # Если контейнер есть, то запускаем существующий
    docker start $CONTAINER_NAME
  fi

check_error

docker exec -d $CONTAINER_NAME yarn serve-storybook

check_error

docker exec $CONTAINER_NAME yarn jest --config=jest.screenshots.config.js "$@"

check_error

docker stop $CONTAINER_NAME
