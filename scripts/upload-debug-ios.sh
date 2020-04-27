#!/usr/bin/env bash
set -e

if [ -z "$API_KEY" ]; then
    export API_KEY=bd55ff3e3761350e05aeee580774bdc8
fi

if [ -z "$APP_VERSION" ]; then
    export APP_VERSION=77
fi

# Download debug source maps from Metro bundler
curl "http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false" > ios-debug.bundle
curl "http://localhost:8081/index.bundle.map?platform=ios&dev=true&minify=false" > ios-debug.bundle.map

# Upload source maps to Bugsnag, making sure to specify the correct app-version.
bugsnag-sourcemaps upload \
    --api-key $API_KEY \
    --app-version $APP_VERSION \
    --minified-file ios-debug.bundle \
    --source-map ios-debug.bundle.map \
    --minified-url "http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false" \
    --overwrite