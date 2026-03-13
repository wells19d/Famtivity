# Famtivity Development Journal

## 2026-03-10 - 2026-03-12

### What we did

- Continued iOS + Firebase setup work for the React Native app
- Kept React Native New Architecture disabled for iOS
- Updated Podfile to use static frameworks for Firebase
- Disabled React Native 0.84 prebuilt RN core for iOS builds
- Reinstalled CocoaPods dependencies
- Rebuilt the iOS app in the simulator successfully
- Confirmed the app launches to the default React Native intro screen

### Problems encountered

- Repeated iOS build failures while integrating Firebase
- Earlier Firebase/Auth header issues during pod and Xcode builds
- RNFBStorage compile failure around `RCT_EXPORT_MODULE()` / `RCT_EXPORT_METHOD(...)`
- Xcode initially tried building to a physical device instead of the simulator
- Large number of script-phase warnings still showing during builds

### Decisions made

- Do not restart the project from scratch
- Keep React Native New Architecture off for now
- Keep current package versions since the project now builds
- Commit the working iOS/Firebase baseline before warning cleanup
- Add a public development journal so the repo shows the real work history

### Current working Podfile notes

- `ENV['RCT_NEW_ARCH_ENABLED'] = '0'`
- `ENV['RCT_USE_PREBUILT_RNCORE'] = '0'`
- `use_frameworks! :linkage => :static`
- `$RNFirebaseAsStaticFramework = true`

### Next steps

- Commit the current working build state
- Clean up iOS build warnings carefully without breaking the build
- Replace the default React Native starter screen
- Begin actual Famtivity app structure/setup
