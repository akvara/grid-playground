#!/usr/bin/env bash

timestamp=$(date +"1.%m.%d")
sed -i.bak -e 's/"version": "[0-1].[0-1][0-9].[0-3][0-9]"/"version": "'$timestamp'"/' ./package.json
