#!/bin/sh
# Publish the game to the VPS (https://cinderring.tech). GitHub Pages updates on git push.
set -e
cd "$(dirname "$0")"
ssh root@179.198.211.204 'mkdir -p /var/www/cinderring/icons'
scp -q index.html og.png root@179.198.211.204:/var/www/cinderring/
scp -q icons/*.jpg root@179.198.211.204:/var/www/cinderring/icons/
echo "deployed: https://cinderring.tech/"
