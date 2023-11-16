#!/bin/bash

#git checkout main
cd /home/aw808/dice-game-frontend/
git pull
npm run build
rm -r /home/aw808/public_html/*
mv /home/aw808/dice-game-frontend/dist/* /home/aw808/public_html/

