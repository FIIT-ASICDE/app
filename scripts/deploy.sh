#!/usr/bin/env bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

set -e

echo -e "${BLUE}Starting deployment process...${RESET}"

echo -e "${YELLOW}Installing dependencies...${RESET}"
npm ci --legacy-peer-deps --omit=dev
echo -e "${GREEN}Dependencies installed successfully.${RESET}"

echo -e "${YELLOW}Generating Prisma client...${RESET}"
npx prisma generate
echo -e "${GREEN}Prisma client generated successfully.${RESET}"

echo -e "${YELLOW}Starting the application...${RESET}"

if [ -z "$(pm2 pid asicde)" ]; then
	echo -e "${YELLOW}No running instance found. Starting the application...${RESET}"
	pm2 start npm --name "asicde" -- start
	echo -e "${GREEN}Application started successfully.${RESET}"
else
	echo -e "${YELLOW}Instance found. Reloading the application...${RESET}"
	pm2 reload asicde
	echo -e "${GREEN}Application reloaded successfully.${RESET}"
fi

echo -e "${BLUE}Deployment process completed successfully.${RESET}"
