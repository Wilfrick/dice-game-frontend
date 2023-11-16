#!/bin/bash

#git checkout main
cd /home/aw808/dice-game-frontend/
git pull
npm run build
mv /home/aw808/dice-game-frontend/dist/* /home/aw808/public_html/

