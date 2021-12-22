#!/usr/bin/env bash

RED='\033[0;31m'
BLUE='\033[0;34m'

MODULE=node_modules/@walletconnect/react-native-dapp/node_modules/react-native-svg
if test -f "$MODULE"; then
    printf "${RED}$MODULE exists. Removing..."
    rm -rf node_modules/@walletconnect/react-native-dapp/node_modules/react-native-svg
else
    printf "${BLUE}$MODULE does not exist."
fi