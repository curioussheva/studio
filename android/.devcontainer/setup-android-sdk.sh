#!/bin/bash
set -e

ANDROID_SDK_ROOT=/usr/local/android-sdk
TOOLS_ZIP=commandlinetools-linux-11076708_latest.zip
TOOLS_URL="https://dl.google.com/android/repository/${TOOLS_ZIP}"

sudo mkdir -p $ANDROID_SDK_ROOT/cmdline-tools
cd $ANDROID_SDK_ROOT

sudo apt-get update -y
sudo apt-get install -y unzip wget

if [ ! -f "$TOOLS_ZIP" ]; then
  wget $TOOLS_URL
fi

sudo unzip -o $TOOLS_ZIP -d cmdline-tools
sudo mv cmdline-tools/cmdline-tools cmdline-tools/latest

echo "export ANDROID_HOME=$ANDROID_SDK_ROOT" | sudo tee -a /etc/profile.d/android.sh
echo "export PATH=\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools:\$PATH" | sudo tee -a /etc/profile.d/android.sh
source /etc/profile.d/android.sh

yes | sdkmanager --sdk_root=$ANDROID_SDK_ROOT "platform-tools" "platforms;android-34" "build-tools;34.0.0"

if [ -f "./gradlew" ]; then
  echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties
fi

echo "✅ Android SDK setup complete."