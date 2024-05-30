#!/bin/sh
if [ "$DEVELOPMENT_MODE" = "true" ]
then
    echo "Running in development mode"
    yarn dev & yarn test:watch
else
    echo "Running in production mode"
    yarn build
    yarn start
fi