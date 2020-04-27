#!/usr/bin/env bash
echo "Cleaning up node modules"
watchman watch-dell-all 
rm -rf ./node_modules
rm yarn.lock
yarn
echo "Cleaning up all temp directories"
rm -rf $TMPDIR/react-* $TMPDIR/metro-* $TMPDIR/haste-*
rm -rf $TMPDIR/haste-map-react-native-packager-*
rm -rf $TMPDIR/react-native-packager-cache*
echo "Cleaning up iOS folders"
cd ios
rm -rf ./Pods ./Podfile.lock build  ~/Library/Developer/Xcode/DerivedData
pod update
pod install
cd ..
echo "Cleaning up Android  folders"
cd android
rm -rf build
cd ..
npm start -- --reset-cache
