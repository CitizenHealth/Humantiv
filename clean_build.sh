#!/usr/bin/env bash

watchman watch-dell-all 
rm -rf ./node_modules 
yarn
rm -rf $TMPDIR/react-*
react-native link
rm -rf $TMPDIR/haste-map-react-native-packager-*
npm start -- --reset-cache
