#!/bin/sh
if [ ! -L ~/Documents/FacebookSDK ] && [ ! -d ~/Documents/FacebookSDK ]; then
    echo 'Symlinking ~/Documents/FacebookSDK to Facebook SDK in repo'
    ln -s $(cd ios/Facebook; pwd) ~/Documents/FacebookSDK
fi
# Fix for code push with React Native 0.56
mkdir android/app
mkdir android/app/build
mkdir android/app/build/intermediates
mkdir android/app/build/intermediates/assets
mkdir android/app/build/intermediates/assets/debug