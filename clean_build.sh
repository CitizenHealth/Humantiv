#!/usr/bin/env bash

watchman watch-dell-all 
rm -rf ./node_modules 
rm package-lock.json
npm install
rm -rf $TMPDIR/react-* $TMPDIR/metro-* $TMPDIR/haste-*
react-native link
#rm -rf $TMPDIR/haste-map-react-native-packager-*
npm start -- --reset-cache
