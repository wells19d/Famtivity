# Famtivity Development Journal

## 2026-03-10 - 2026-03-12

### What we did

- Continued iOS and Firebase setup for the React Native app
- Kept React Native New Architecture disabled for iOS
- Updated the Podfile to use static frameworks for Firebase
- Disabled React Native 0.84 prebuilt RN core for iOS builds
- Reinstalled CocoaPods dependencies
- Rebuilt the iOS app successfully in the simulator
- Confirmed the app launches to the default React Native intro screen
- Reduced the large warning list down to a much smaller set
- Added a public `DEVLOG.md` file to track progress

### Struggles

- Repeated iOS build failures while integrating Firebase
- Firebase/Auth header issues during pod and Xcode builds
- RNFBStorage compile failure around `RCT_EXPORT_MODULE()` / `RCT_EXPORT_METHOD(...)`
- Xcode initially tried building to a physical device instead of the simulator
- Large amount of warning noise made it harder to spot real issues
