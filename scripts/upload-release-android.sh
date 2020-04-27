#!/usr/bin/env bash
set -e

if [ -z "$API_KEY" ]; then
    export API_KEY=bd55ff3e3761350e05aeee580774bdc8
fi

if [ -z "$APP_VERSION" ]; then
    export APP_VERSION=37
fi

# Generate source maps using react-native bundler
react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android-release.bundle \
    --sourcemap-output android-release.bundle.map

# Upload source maps to Bugsnag, making sure to specify the correct app-version.
bugsnag-sourcemaps upload \
    --api-key $API_KEY \
    --app-version $APP_VERSION \
    --minified-file android-release.bundle \
    --source-map android-release.bundle.map \
    --minified-url index.android.bundle \
    --upload-sources \
    --overwrite