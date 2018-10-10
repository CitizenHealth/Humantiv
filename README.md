
  

  

# Humantiv

  

  

  

Mobile app to calculate the user health score and issue Medits tokens

  

  

  

  

# Development Environment and Configuration

  

  

  

  

## Android

  

  

  

  

### Step 1: Get the SHA-1 of your Android Developer Debug Keystore

  

  

  

  

keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore

  

  

  

  

The password is android.

  

  

  

  

Copy the SHA-1 value, which will look something like this in the output:

  

  

  

  

Certificate Fingerprints

  

  

  

  

SHA1: aa:bb:cc:dd:ee:ff:11:22:33:44:47:D0:9E:8D:E0:0C:79:F1:0F:CB

  

  

  

  

### Step 2: Add the SHA to the Android App in the Firebase Console

  

  

  

  

Now open up your Android App in the Firebase console and add the SHA-1:

  

  

  

  

[![image](https://user-images.githubusercontent.com/1926984/34451636-e854a330-ed5e-11e7-83b9-459d5d59b86c.png)](https://user-images.githubusercontent.com/1926984/34451636-e854a330-ed5e-11e7-83b9-459d5d59b86c.png)

  

  

## Component development

  

[Storybook](https://storybook.js.org/basics/quick-start-guide/) is used to develop and modify components. To run Storybook, run the commands below:

  

  

```

  

npm run storybook

  

```

  

  

and from another terminal run:

  

  

```

  

react-native run-ios

  

```

  

  

# Development resources

  

  

  

## Custom Fonts

  

  

  

Please follow this guide to add a new custom font:

  

  

[Custom Fonts in React Native for iOS & Android Builds](https://medium.com/@kswanie21/custom-fonts-in-react-native-tutorial-for-ios-android-76ceeaa0eb78)

  

# Troubeshooting

  

## Android:

### Module cannot be loaded in Android Studio. .iml file cannot be found:

  

1. Close the project

2. Re-open it

3. Try to fix any wrong dependency version

4. Android Studio -> File -> Invalidate Caches/ Restart

  ### Cannot load module file xxx. File xxx.iml does not exist
When modules are not loading, check if all imports in MainApplication.java and dependencies are there. One missing dependency or import and the build can break with cryptic error messages.

## iOS

### error: Build input file cannot be found: '.../node_modules/react-native/third-party/double-conversion-1.1.5/src/fixed-dtoa.cc'

  

If you are a new Xcode, you might have this error. React Native libraries are slow to move to the new iOS libraries. Make sure you are using legacy build system.

  

Xcode -> File -> Workspace Settings ...

  

![Legacy build system](https://firebasestorage.googleapis.com/v0/b/health-score-6740b.appspot.com/o/development%2Fresources%2Fimages%2Fhumantiv-app%2FScreen%20Shot%202018-10-04%20at%202.43.05%20PM.png?alt=media&token=fbe63efd-8cdc-46eb-adaa-07aef35dd2fc)

# Build Status

  

  

  

## Nevercode React Native

  

  

  

[![Nevercode build status](https://app.nevercode.io/api/projects/679a112b-d03e-4998-9ec5-b7380f833b18/workflows/87fd9f97-e635-442e-a4a4-e1b03ad825c5/status_badge.svg?branch=master)](https://app.nevercode.io/#/project/679a112b-d03e-4998-9ec5-b7380f833b18/workflow/87fd9f97-e635-442e-a4a4-e1b03ad825c5/latestBuild?branch=master)

  
  

## App Center

  

| Android | [![Build status](https://build.appcenter.ms/v0.1/apps/b7f2dff4-eb48-4276-bfec-d039660af96c/branches/master/badge)](https://appcenter.ms) |

|--|--|

| iOS | [![Build status](https://build.appcenter.ms/v0.1/apps/1b98ec5d-c8f6-4916-b279-b4820e4f5870/branches/master/badge)](https://appcenter.ms) |