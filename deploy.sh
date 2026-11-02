#!/bin/bash

quasar build -m spa
cp manifest-obr.json dist/spa/

rsync -aWv --delete dist/spa/ server:/var/www/nboughton.uk/public/apps/obr-twilight-sword-sheet/
