#!/usr/bin/env bash
set -e

if [ -z "$API_KEY" ]; then
    export API_KEY=bd55ff3e3761350e05aeee580774bdc8
fi

if [ -z "$APP_VERSION" ]; then
    export APP_VERSION=1.2.0
fi

if [ -z "$APP_CODE" ]; then
    export APP_CODE=37
fi

# Download debug source maps from Metro bundler
curl "http://localhost:8081/index.bundle?platform=android&dev=true&minify=false" > android-debug.bundle
curl "http://localhost:8081/index.bundle.map?platform=android&dev=true&minify=false" > android-debug.bundle.map

# Upload source maps to Bugsnag, making sure to specify the correct app-version.
curl https://upload.bugsnag.com/react-native-source-map \
   -F apiKey=$API_KEY \
   -F appVersion=$APP_VERSION \
   -F appVersionCode=$APP_CODE \
   -F dev=true \
   -F platform=android \
   -F sourceMap=@android-debug.bundle.map \
   -F bundle=@android-debug.bundle \
   -F projectRoot=`pwd`
