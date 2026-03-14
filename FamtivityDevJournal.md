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

## 2026-03-13

### What we did

- Reviewed the current Famtivity project state, prior session context, and exported project snapshot
- Added a group of new app libraries for storage, navigation, gestures, icons, redux, and utility helpers
- Hit a new iOS build failure after library updates, traced mainly to `react-native-reanimated`
- Confirmed the first Hermes-related failure was tied to the newer Hermes V1 path on React Native 0.84
- Updated the Podfile to keep New Architecture off, keep prebuilt RN core off, and disable Hermes V1
- Reinstalled pods and confirmed Hermes rolled back to the legacy engine path
- Got past the original Hermes header error
- Hit multiple native Reanimated compatibility errors after that
- Removed `react-native-reanimated` from the project for now
- Removed the Reanimated Babel plugin from `babel.config.js`
- Reinstalled pods again and rebuilt successfully in Xcode
- Confirmed the splash screen and default `App.tsx` screen both load again

### Struggles

- `react-native-reanimated` caused repeated native iOS build failures on React Native `0.84.1`
- Initial failure was around missing Hermes inspector headers near the end of the build
- After disabling Hermes V1, new Reanimated native compatibility errors appeared instead
- Build/debug cycle turned into a chain of one issue exposing the next
- Xcode still shows a set of legacy architecture and native warning noise, even though the app now builds
