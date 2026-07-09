#!/usr/bin/env bash

PLAYWRIGHT_VERSION=1.33.0
CONTAINER_NAME='playwright-'$PLAYWRIGHT_VERSION'-local'

check_error () {
  if [ ! "$?" -eq "0" ]
  then
    docker stop $CONTAINER_NAME;
    exit 1;
  fi
}

if [ ! "$(docker ps -a -q -f name=^/${CONTAINER_NAME}$)" ]
  then
    # Если контейнера нет, то создаем новый
    docker run --name $CONTAINER_NAME -d -it --network=host --env STORYBOOK_URL=http://host.docker.internal:9009/iframe.html --ipc=host -v "$(pwd)":/core-components -w /core-components  mcr.microsoft.com/playwright:v$PLAYWRIGHT_VERSION-jammy
    check_error
    docker exec $CONTAINER_NAME bash -c "apt-get update; apt-get install fonts-inter -y; fc-cache -f"

  else
    # Если контейнер есть, то запускаем существующий
    docker start $CONTAINER_NAME
  fi

check_error

docker exec -e CORE_COMPONENTS_VARIANT="$CORE_COMPONENTS_VARIANT" $CONTAINER_NAME yarn jest --config=jest.screenshots.config.mjs "$@"

check_error

docker stop $CONTAINER_NAME
