export const buildUser = userInfo => {
  if (!userInfo) return null;

  const user = userInfo?._user ?? userInfo?.user?._user ?? userInfo;

  return {
    uid: user?.uid,
    email: user?.email,
    emailVerified: user?.emailVerified,
    isAnonymous: user?.isAnonymous,
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    refreshToken: user?.refreshToken,
    creationTime: user?.metadata?.creationTime,
    lastSignInTime: user?.metadata?.lastSignInTime,
  };
};
