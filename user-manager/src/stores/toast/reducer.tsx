import { TOAST_TYPE } from '@constants';

export type ToastState = 'idle' | 'processing' | 'success' | 'error';

export const initialState: ToastState = 'idle';

/**
 * Reducer function for managing the state of toasts.
 *
 * @param _state - The current state of the toast.
 * @param action - The action to be performed on the toast state.
 * @returns The new state after applying the specified action.
 * @throws An error if the action type is unhandled.
 */
export const toastReducer = (
  _state: ToastState,
  action: ToastState
): ToastState => {
  switch (action) {
    case TOAST_TYPE.IDLE:
      return 'idle';
    case TOAST_TYPE.PROCESSING:
      return 'processing';
    case TOAST_TYPE.SUCCESS:
      return 'success';
    case TOAST_TYPE.ERROR:
      return 'error';
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};
