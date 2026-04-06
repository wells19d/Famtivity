# Famtivity Development Journal

## 03-10-2026 - 03-12-2026

### What we did

- Continued iOS and Firebase setup for the React Native app
- Kept React Native New Architecture disabled for iOS
- Updated the Podfile to use static frameworks for Firebase
- Disabled React Native 0.84 prebuilt RN core for iOS builds
- Reinstalled CocoaPods dependencies
- Rebuilt the iOS app successfully in the simulator
- Confirmed the app launches to the default React Native intro screen
- Reduced the large warning list down to a much smaller set
- Added a public `DEVLOG` file to track progress

### Struggles

- Repeated iOS build failures while integrating Firebase
- Firebase/Auth header issues during pod and Xcode builds
- RNFBStorage compile failure around `RCT_EXPORT_MODULE()` / `RCT_EXPORT_METHOD(...)`
- Xcode initially tried building to a physical device instead of the simulator
- Large amount of warning noise made it harder to spot real issues

## 03-13-2026

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

## 3-14-2026 & 03-15-2026

### What we did

- Added `react-native.config.js` for project asset configuration
- Registered `react-native-vector-icons` for iOS using:
  `npx rnvi-update-plist package.json ios/Famtivity/Info.plist`
- Tested icon rendering successfully with `<AntDesign name="home" size={40} />`
- Added custom fonts to `src/fonts`
- Linked custom fonts with:
  `npx react-native-asset`
- Tested custom fonts in the app and confirmed they render correctly
- Set up root saga and root reducer structure
- Added the first reducer/saga flow for device info
- Added `useHooks.tsx` and created `useDeviceInfo()` for simpler global selector access
- Updated `App.tsx` to use `Provider`, `PersistGate`, `GestureHandlerRootView`, and `SafeAreaProvider`
- Set up a temporary `store.js` with Redux, saga middleware, persistence, and `AsyncStorage`
- Started the custom UI system under `src/ui`
- Confirmed `UIView` is wired in as the first reusable UI component

### Struggles

- iOS icon font setup was confusing at first because manual Xcode linking caused duplicate resource build failures
- Had to back out of the broken manual font setup and restart from a clean project state
- There was confusion between library-managed icon fonts and app-owned custom fonts
- Saga TypeScript conversion caused some friction around generator typing and what actually needed to be typed
- A few setup steps were working correctly, but the flow was hard to verify until each part was tested directly in the app

## 03-23-2026

### What we did

- Added `UIUtilities` as a font, color, size, button style standardization kit
- Added `IconList` as a icon list system for icon standardization
- Updated `index` for ui, for a single import system
- Updated and tested the `View`, `Text`, and `Icons` to make sure they are working with their prop conditions.

### Struggles

- Found that ios updated the font system integration for open sans, updated the font for correction.
- Found that the FontAwesome Icon system needed another prop system that can not be pulled into a prop system and must be included individually for each icon.

## 04-03-2026

### What we did

- Upgraded packages for vector icons, haptic feedback, and firebase.
- Created Test data in a hidden package system
- Created a simulated redux hook for user connected data
- Updated pre-designed / determined database

### Struggles

- None. Possible package conflicts due to development, it wasn't a concern with current progress.

## 04-06-2026

### What we did

- Updated App to be a true init building component
- Created Main for our navigational stack
- Created `Landing` as our navigation screen
- Move Home into its own folder along with `Landing`
- Removed Test Data hook from production

### Struggles

- None, but react-test-renderer was on incorrect compatible versions. Downgraded to 19.2.3 from 19.2.4

#### Notes:

- Landing is going to be our navigation system. We are going to render this like an iOS screen that renders apps.
- Primary screens will close/open with animation, like we are opening an app.
- Secondary screens will render like standard navigation / flip pages.
- "Apps" will render based on users, roles, account types and settings.
- We will need react animation again, but for starting development, we will leave the animation out for now.
