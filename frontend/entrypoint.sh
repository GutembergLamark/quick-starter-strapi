#!/usr/bin/env bash

echo $DB_HOST:$DB_PORT;

cd /app;

yarn

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_RAN_ONCE"

dockerize -wait tcp://$DB_HOST:$DB_PORT -timeout 4000s

if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
mkdir /app
    touch /app/nginx/$CONTAINER_ALREADY_STARTED

    echo "-- Container running for its first time"

    touch /app/log/yarn.log;
else
    echo "-- Container already run. No need to be reconfigured"
fi

echo "-- Running services";

cd /app

if [ "$DEVELOPMENT_MODE" = "true" ]; then
    echo "-- Running Next in development mode";
    yarn dev &
else
    echo "-- Running Next in production mode";
    yarn build
    nohup yarn start &> /app/log/yarn.log &
fi

tail -f /app/log/yarn.log