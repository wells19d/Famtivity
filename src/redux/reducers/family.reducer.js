//* family.reducer.jsx
const initialState = {
  family: null,
  allowedProfiles: [],
  error: null,
};

const familyReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Family set or created
    case 'SET_FAMILY':
    case 'FAMILY_CREATE_SUCCESS':
      return { ...state, family: action.payload, error: null };
    case 'DAILY_COUNTUP_SUCCESS':
      return state;
    case 'RESET_DAILY_COUNTERS_SUCCESS':
      return {
        ...state,
        family: {
          ...state.family, // 🟢 Preserve existing data
          ...action.payload, // 🟢 Overwrite with updated fields
        },
        error: null,
      };

    case 'FAMILY_CREATE_FAILURE':
    case 'FAMILY_FETCH_FAILED':
    case 'RESET_DAILY_COUNTERS_FAILED':
      return { ...state, error: action.payload };

    // ✅ Allowed profiles
    case 'SET_ALLOWED_PROFILES':
      return { ...state, allowedProfiles: action.payload };
    case 'FETCH_ALLOWED_PROFILES_FAILED':
      return { ...state, error: action.payload };

    // 🔄 Reset
    case 'RESET_FAMILY_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default familyReducer;
