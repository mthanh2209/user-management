import { TYPES } from '@constants';

export interface StateProp {
  toast: 'idle' | 'processing' | 'success' | 'error';
  selectedRow: { index: number; data: any | null };
}

export interface ActionProp {
  type: keyof typeof TYPES;
  payload?: any;
}

export const initialState: StateProp = {
  toast: 'idle',
  selectedRow: { index: 0, data: null }
};

/**
 * Reducer function for managing the state of toasts.
 *
 * @param state - The current state of the toast.
 * @param action - The action to be performed on the toast state.
 * @returns The new state after applying the specified action.
 * @throws An error if the action type is unhandled.
 */
const Reducer = (state: StateProp, action: ActionProp): StateProp => {
  switch (action.type) {
    case TYPES.IDLE:
      return {
        ...state,
        toast: 'idle'
      };
    case TYPES.PROCESSING:
      return {
        ...state,
        toast: 'processing'
      };
    case TYPES.SUCCESS:
      return {
        ...state,
        toast: 'success'
      };
    case TYPES.ERROR:
      return {
        ...state,
        toast: 'error'
      };
    case TYPES.SELECTED_ROW:
      return {
        ...state, 
        selectedRow: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default Reducer;
