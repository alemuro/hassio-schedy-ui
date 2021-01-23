#!/usr/bin/env bash

CONFIG_PATH=/data/options.json

export SCHEDY_CONF_FILE=$(jq --raw-output ".schedy_config_file" $CONFIG_PATH)

yarn run start
