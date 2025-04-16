#!/usr/bin/env bash

set -e
source ~/.bashrc

bun install --production
bunx prisma generate

if [ -z "$(pm2 pid asicde)" ]; then
	pm2 start bun --name "asicde" --time -- start
	pm2 save
else
	pm2 reload asicde --update-env
fi
