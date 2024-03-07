import { TOAST_TYPE } from '@constants';

export interface StateProp {
  toast: 'idle' | 'processing' | 'success' | 'error';
}

interface ActionProp {
  type: keyof typeof TOAST_TYPE;
  payload: any;
}

export const initialState: StateProp = {
  toast: 'idle'
};

/**
 * Reducer function for managing the state of toasts.
 *
 * @param _state - The current state of the toast.
 * @param action - The action to be performed on the toast state.
 * @returns The new state after applying the specified action.
 * @throws An error if the action type is unhandled.
 */
export const toastReducer = (
  state: StateProp,
  action: ActionProp
): StateProp => {
  switch (action.type) {
    case TOAST_TYPE.IDLE:
      return {
        ...state,
        toast: 'idle'
      };
    case TOAST_TYPE.PROCESSING:
      return {
        ...state,
        toast: 'processing'
      };
    case TOAST_TYPE.SUCCESS:
      return {
        ...state,
        toast: 'success'
      };
    case TOAST_TYPE.ERROR:
      return {
        ...state,
        toast: 'error'
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
