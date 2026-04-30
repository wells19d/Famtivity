//* task.reducer.js
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔄 Fetching
    case 'FETCH_TASKS':
      return { ...state, loading: true, error: null };

    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false, error: null };

    case 'TASKS_SET_FAILED':
      return { ...state, loading: false, error: action.payload };

    // ➕ Add Task
    case 'ADD_TASK':
      return { ...state, loading: true, error: null };

    case 'ADD_TASK_SUCCESS':
      return { ...state, loading: false, error: null };

    case 'ADD_TASK_FAILED':
      return { ...state, loading: false, error: action.payload };

    // ✏️ Update Task
    case 'UPDATE_TASK':
      return { ...state, loading: true, error: null };

    case 'UPDATE_TASK_SUCCESS':
      return { ...state, loading: false, error: null };

    case 'UPDATE_TASK_FAILED':
      return { ...state, loading: false, error: action.payload };

    // 👪 Parental Override
    case 'PARENTAL_OVERRIDE_TASK':
      return { ...state, loading: true, error: null };

    case 'PARENTAL_OVERRIDE_TASK_SUCCESS':
      return { ...state, loading: false, error: null };

    case 'PARENTAL_OVERRIDE_TASK_FAILED':
      return { ...state, loading: false, error: action.payload };

    // 📦 Archive Task
    case 'ARCHIVE_TASK':
      return { ...state, loading: true, error: null };

    case 'ARCHIVE_TASK_SUCCESS':
      return { ...state, loading: false, error: null };

    case 'ARCHIVE_TASK_FAILED':
      return { ...state, loading: false, error: action.payload };

    // ❌ Delete Task
    case 'DELETE_TASK':
      return { ...state, loading: true, error: null };

    case 'DELETE_TASK_SUCCESS':
      return { ...state, loading: false, error: null };

    case 'DELETE_TASK_FAILED':
      return { ...state, loading: false, error: action.payload };

    // ♻️ Reset
    case 'RESET_TASKS':
      return { ...state, loading: true, error: null };

    case 'RESET_TASKS_SUCCESS':
      return { ...state, tasks: [], loading: false, error: null };

    case 'RESET_TASKS_FAILED':
      return { ...state, loading: false, error: action.payload };

    case 'RESET_TASKS_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default taskReducer;
