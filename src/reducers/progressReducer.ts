import type { ProgressState } from '../state/progressContextBase';

// Initial state for the progress reducer
export const initialProgressState: ProgressState = {
  completed: [],
  loading: false,
  error: null,
};

// Define action types for the progress reducer
type Action =
  | { type: 'LOAD_START' } |
  { type: 'LOAD_SUCCESS'; payload: number[] } |
  { type: 'LOAD_ERROR'; payload: string } |
  { type: 'MARK_DONE'; payload: number } |
  { type: 'RESET' };

// Reducer function to manage progress state
export function progressReducer(state: ProgressState, action: Action): ProgressState {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOAD_SUCCESS':
      return {
        completed: [...action.payload].sort((a, b) => a - b),
        loading: false,
        error: null,
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'MARK_DONE': {
      if (state.completed.includes(action.payload)) {
        return state;
      }
      const next = [...state.completed, action.payload].sort((a, b) => a - b);

      return { ...state, completed: next };
    }
    case 'RESET':
      return { ...state, completed: [] };
    default:
      return state;
  }
}
