# EchoJS mobile client

## Setup

* Install the android SDK: http://developer.android.com/sdk/
* Install the latest Java JDK: http://www.oracle.com/technetwork/java/javase/downloads/
* 
## Running the server

This client requires a proxy API to the EchoJS api. Install and run the server before running this client: https://github.com/badsyntax/echojs-mobile-server

## npm scripts

* `npm start` - Start the project in dev mode, available at http://localhost:8000
* `npm run build` - Build the project in dev mode
* `npm run build:release` - Build the project for release
* `npm run emulate` - Open the mobile emulator in dev mode
* `npm run emulate:release` - Open the mobile emulate in release mode

## Installing apk on device

Android requires that all apps be digitally signed with a certificate before they can be installed.

1. Enable USB debugging on your Android device.
2. Run `npm run build:release` to build the apk.
3. Sign the apk: (Keystore password is: echojs)

  ```
  cd client/platforms/android/ant-build
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../keystores/EchoJS.keystore EchoJS-release-unsigned.apk EchoJS
  ```
4. Install the apk with the `adb` tool:

  ```
  ~/Library/Android/sdk/platform-tools/adb install   app/client/platforms/android/ant-build/EchoJS-release-unsigned.apk
  ```
