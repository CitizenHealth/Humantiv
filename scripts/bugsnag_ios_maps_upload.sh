#!/usr/bin/env bash

curl https://upload.bugsnag.com/react-native-source-map \
   -F apiKey=bd55ff3e3761350e05aeee580774bdc8 \
   -F appVersion=1.5.0 \
   -F appBundleVersion=77 \
   -F dev=true \
   -F platform=ios \
   -F sourceMap=@ios-debug.bundle.map \
   -F bundle=@ios-debug.bundle \
   -F projectRoot=`pwd`