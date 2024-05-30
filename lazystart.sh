#!/usr/bin/env bash

docker-compose down --volumes

sudo chmod a+rw -R .

if type lazydocker >/dev/null 2>&1; then
	docker-compose up --build -d
	lazydocker
else
	docker-compose up --build
fi