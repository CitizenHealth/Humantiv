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

# Build Status
[![Nevercode build status](https://app.nevercode.io/api/projects/679a112b-d03e-4998-9ec5-b7380f833b18/workflows/87fd9f97-e635-442e-a4a4-e1b03ad825c5/status_badge.svg?branch=master)](https://app.nevercode.io/#/project/679a112b-d03e-4998-9ec5-b7380f833b18/workflow/87fd9f97-e635-442e-a4a4-e1b03ad825c5/latestBuild?branch=master)