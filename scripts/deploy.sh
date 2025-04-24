#!/usr/bin/env bash

set -e

bun install --production
bunx prisma generate

if [ -z "$(pm2 pid asicde)" ]; then
	pm2 start bun --name "asicde" --time -- start
	pm2 save
else
	pm2 reload asicde --update-env
fi

if pm2 show asicde | grep 'status ' | grep -q 'online'; then
	exit 0 # Exit with success code
else
	echo "Error: Service 'asicde' failed to start or reload properly."
	pm2 status asicde
	exit 1
fi
