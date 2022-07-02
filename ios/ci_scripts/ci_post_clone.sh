#!/bin/sh

# Create env file
echo $API_URL > ../../.env

# Create Google Services file
echo $GOOGLE_SERVICES > ../GoogleService-Info.plist

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
# have to add node yourself
brew install node@16
# link it to the path
brew link node@16

brew install yarn

# Install dependencies you manage with CocoaPods.
yarn
pod install
