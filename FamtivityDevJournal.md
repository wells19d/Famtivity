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

## 04-16-2026

### What we did

- Updated Main. Pulled createNativeStackNavigator and Navigation outside of the component. See struggles for why.
- Updated LandingPage for naming scheme change.

### Struggles

- Navigation between screens was causing slow / bogged down due to having to re-render the Stack and the Navigation on every load. Thought this was due to a layer issue, but determined it was these 2 things causing our problems. Now Navigation quickly between screens doesn't slow / bog down the loading of each screen.

## 04-17-2026

### What we did

- Took test data (not in the project) and pushed it into firebase cloud firestore for (auth, profile, family), so we could log in users and test the family and profile connections we will create with redux sagas and reducers.
- Updated LandingPage, just turned all the buttons on for screenshots.
- Updated rulesets so no unauthorized and / or logged out users can access the database in firebase.

### Struggles

- None

## 04-20-2026

### What we did

- Fixed Firebase real-time listener issues causing unexpected errors
- Identified and isolated issues tied to unfinished real-time listener setup
- Updated family.saga to correctly use getFirestore(app, 'default')
- Confirmed family data is now being retrieved successfully
- Verified user, profile, and family data flow working together in Redux

### Struggles

- Real-time listeners caused confusing and misleading errors
- Debugging was difficult due to overlapping saga and listener behavior
- Some errors appeared unrelated to the actual root cause

## 04-24-2026

### What we did

- Built Firebase Admin import tooling in a separate local environment
- Created import script to batch upload families, profiles, and tasks
- Resolved Firestore NOT_FOUND issue using getFirestore(app, 'default')
- Standardized Firebase modular usage across sagas
- Cleaned up data shape to avoid Firebase internal warnings
- Implemented login, user, and profile sagas (ported and adapted from previous project)

### Struggles

- Firestore initialization issues caused blocking errors during import
- Needed to troubleshoot differences between Admin SDK and client SDK usage
- Data normalization required to avoid Firestore serialization warnings

## 04-28-2026 - 04-30-2026

### What we did

- Completed full task saga system:
  - addTask, updateTask, archiveTask, deleteTask, parentalOverrideTask
- Introduced centralized permission helpers:
  - canUpdateTask, canArchiveTask, canDeleteTask, canOverrideTask, canViewTask
- Refactored all saga logic to use helper-based permission checks
- Upgraded task schema:
  - Replaced assignedTo array of strings with object-based structure
  - Added per-user confirmation (confirmed, confirmedAt)
  - Removed taskConfirmed field
- Implemented strict archive behavior:
  - Archived tasks are a hard stop for updates and overrides
- Added structured history logging for updates and archive actions
- Cleaned up reducer to support all task actions consistently
- Improved data consistency and prepared schema for UI filtering logic

### Struggles

- Transitioning assignedTo structure required updates across multiple layers (saga, helpers, UI logic)
- Permission logic became complex and required abstraction into helper functions
- Timestamp inconsistencies during import vs runtime required clarification
- Needed to carefully separate UI logic vs saga responsibility for permissions and visibility

## 05-01-2026

### What we did

- Completed / updated task saga for Hard Reset per family. (Admin Action Only)
- Updated canViewTask for blockedView. Which is an array of strings of users blocked from the task. Preventing a user from seeing a private task. (ex: parent and child private task from another parent. aka buy a birthday present)
- Updated database structure for tasks for blockedView
- Moved `plan.txt` and `task_rules.txt` into a documentation folder for public view.
- Created Realtime Listener for tasks.
- Added New UI component for custom scroll viewing.

### Struggles

- Reading project allowed, determined that if a parent and a child wanted a private task and not be visible to another parent, we would need something to block users from seeing it, since in the children section, all parents would be able to see all child tasks. This will now prevent a blocked parent from seeing a task created by another adult with a child. We will have to put in the UI that a blocked user can not be the person it was assigned to or who created it. Also, children will not be able to block any users in their private tasks. All adults need to be able to see all tasks they are not blocked from.

## 05-06-2026

### What we did

- Completed the task helpers per screen.
- Updated My Tasks helper's return to remove inside object not needed. Did the same with the remaining except for history, history will need an inside object to return completed and archived.

### Struggles

- I was struggling if I made the helpers doing double checks that were not needed. Worried I was checking twice over data instead of focusing on what was still needed to be filtered per screen. Ran my filters through chat gpt and determined I had the right mindset, I was just confusing myself... maybe just a "off brain day". Next I move onto the UI and how we want to handle task displays views. (not adding or editing yet).

## 05-07-2026

### What we did

- Updated the structure of how we use a task system into a task management system.
- Started first Draft design of our task displays on `My Tasks` using family tasks for now since we had more test data.
- Updated Icons
- Updated View

### Struggles

- None at this time. Mostly just trial and error of UI design.

## 05-08-2026 - 05-22-2026

### What we did

- Built out task filter views in `My Tasks` along with a new component, `SlideToggle` with 3 filtered views for `Hourly`, `Today`, and `All`.
- Moved build view logic system into a re-useable component `TaskSystem` for `My Tasks`, `Family Tasks`, and `Child Tasks`.
- Added format systems in `helper.js` for reusability.

### Struggles

- Not really any struggles except for some spread key prop in jsx errors. To correct them, used chat gpt to mute the console.log and logbox to `index.js`.
