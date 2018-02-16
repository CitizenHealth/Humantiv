#!/bin/sh
if [ ! -L ~/Documents/FacebookSDK ] && [ ! -d ~/Documents/FacebookSDK ]; then
    echo 'Symlinking ~/Documents/FacebookSDK to Facebook SDK in repo'
    ln -s $(cd ios/Facebook; pwd) ~/Documents/FacebookSDK
fi