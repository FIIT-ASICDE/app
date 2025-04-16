#!/usr/bin/env bash

set -e

bun install --production
bunx prisma generate

if [ -z "$(pm2 pid asicde)" ]; then
	pm2 start npm --name "asicde" -i 2 -- start
	pm2 save
else
	pm2 reload asicde --update-env
fi
