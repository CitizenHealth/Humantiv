#!/bin/sh
if [ ! -L ~/Documents/FacebookSDK ]; then
    echo 'Symlinking ~/Documents/FacebookSDK to Facebook SDK in repo'
    ln -s $(cd ios/Humantiv/Facebook; pwd) ~/Documents/FacebookSDK
fi