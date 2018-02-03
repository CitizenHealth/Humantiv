#!/usr/bin/env bash

rm -rf ./node_modules 
watchman watch-dell-all 
npm cache clean 
npm install 
react-native link