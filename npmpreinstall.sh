#!/bin/sh
if [ ! -L ~/Documents/FacebookSDK ] && [ ! -d ~/Documents/FacebookSDK ]; then
    echo 'Symlinking ~/Documents/FacebookSDK to Facebook SDK in repo'
    ln -s $(cd ios/Facebook; pwd) ~/Documents/FacebookSDK
fi

# Fix for code push with React Native 0.56
APPDIR="android/app"
if [ ! -d "$APPDIR" ]; then
  echo 'Creating' $APPDIR
  mkdir $APPDIR
fi

BUILDDIR="android/app/build"
if [ ! -d "$BUILDDIR" ]; then
  echo 'Creating' $BUILDDIR
  mkdir $BUILDDIR
fi

INTERMEDIATESDIR="android/app/build/intermediates"
if [ ! -d "$INTERMEDIATESDIR" ]; then
  echo 'Creating' $INTERMEDIATESDIR
  mkdir $INTERMEDIATESDIR
fi

ASSETSDIR="android/app/build/intermediates/assets"
if [ ! -d "$ASSETSDIR" ]; then
  echo 'Creating' $ASSETSDIR
  mkdir $ASSETSDIR
fi

DEBUGDIR="android/app/build/intermediates/assets/debug"
if [ ! -d "$DEBUGDIR" ]; then
  echo 'Creating' $DEBUGDIR
  mkdir $DEBUGDIR
fi
