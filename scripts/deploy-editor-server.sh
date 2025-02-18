#!/usr/bin/env bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

set -e

echo -e "${BLUE}Starting editor server deployment process...${RESET}"

echo -e "${YELLOW}Setting execute permissions for the server binary...${RESET}"
chmod +x editor-server/editor-server
echo -e "${GREEN}Execute permissions set successfully.${RESET}"

echo -e "${YELLOW}Creating symlink for .env file...${RESET}"
if [ -L "editor-server/.env" ]; then
	echo -e "${YELLOW}Removing existing symlink...${RESET}"
	rm editor-server/.env
fi
ln -s ../.env editor-server/.env
echo -e "${GREEN}Symlink created successfully.${RESET}"

echo -e "${YELLOW}Starting the editor server...${RESET}"

if [ -z "$(pm2 pid editor-server)" ]; then
	echo -e "${YELLOW}No running instance found. Starting the editor server...${RESET}"
	pm2 start ./editor-server --name "editor-server"
	pm2 save
	echo -e "${GREEN}Editor server started successfully.${RESET}"
else
	echo -e "${YELLOW}Instance found. Reloading the editor server...${RESET}"
	pm2 reload editor-server
	echo -e "${GREEN}Editor server reloaded successfully.${RESET}"
fi

echo -e "${BLUE}Editor server deployment process completed successfully.${RESET}"
