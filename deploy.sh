#!/bin/sh
# Publish the game to the VPS (https://cinderring.tech). GitHub Pages updates on git push.
set -e
cd "$(dirname "$0")"
scp -q index.html og.png root@179.198.211.204:/var/www/cinderring/
echo "deployed: https://cinderring.tech/"
