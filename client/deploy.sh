#!/usr/bin/env bash

cd client/platforms/android/ant-build

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../keystores/EchoJS.keystore EchoJS-release-unsigned.apk EchoJS

~/Library/Android/sdk/platform-tools/adb install EchoJS-release-unsigned.apk
