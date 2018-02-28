#!/usr/bin/env bash

watchman watch-dell-all 
rm -rf ./node_modules 
yarn
rm -rf $TMPDIR/react-*
react-native link
npm start -- --reset-cache
rm -rf $TMPDIR/haste-map-react-native-packager-*