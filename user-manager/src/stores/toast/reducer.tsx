import { TOAST_TYPE } from '@constants';

export type ToastState = 'idle' | 'success' | 'error';

export type ToastAction = { type: 'SUCCESS' } | { type: 'ERROR' };

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
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case TOAST_TYPE.IDLE:
      return 'idle';
    case TOAST_TYPE.SUCCESS:
      return 'success';
    case TOAST_TYPE.ERROR:
      return 'error';
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
