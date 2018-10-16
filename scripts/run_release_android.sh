#!/usr/bin/env bash

cd android
./gradlew assembleRelease
cd -
react-native run-android --variant=release