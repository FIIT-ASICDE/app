#!/usr/bin/env bash

rsync -avzr --delete --exclude 'public' --exclude '.env*' ./.next/standalone/ asicde@147.175.149.102:/home/asicde/asicde/
rsync -avzr --delete --exclude 'public' --exclude '.env*' ./.next/static/ asicde@147.175.149.102:/home/asicde/asicde/.next/static
rsync -avzr --delete ./public/ asicde@147.175.149.102:/home/asicde/asicde/public
rsync -avzr --delete --exclude 'public' --exclude '.env*' ./scripts/ asicde@147.175.149.102:/home/asicde/asicde/scripts
ssh asicde@147.175.149.102 "cd ~/asicde && ./scripts/deploy.sh"
