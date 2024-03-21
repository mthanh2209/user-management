import { useEffect, useState } from 'react';

// CSS
import '@components/Toast/Toast.css';

// Constants
import { LOADING, TYPES } from '@constants';

export interface IToastContainer {
  position?: string;
  type: 'idle' | 'processing' | 'success' | 'error';
}

const Toast = ({ type, position = 'top-right' }: IToastContainer) => {
  const [showToast, setShowToast] = useState(false);

  const toastMessage =
    type === TYPES.SUCCESS ? 'Done' : 'Failed';

  const iconClass =
    type === TYPES.SUCCESS ? 'success-icon' : 'error-icon';

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (type === TYPES.SUCCESS || type === TYPES.ERROR) {
      setShowToast(true);

      timer = setTimeout(() => {
        setShowToast(false);
      }, LOADING.TIMER_HIDE_LOADING);
    } else {
      setShowToast(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [type]);

  return (
    <>
      {showToast &&
        (type === TYPES.SUCCESS || type === TYPES.ERROR) && (
          <div className={`toast-wrapper ${position}`}>
            <div className='toast'>
              <p className='toast-message'>{toastMessage}</p>
              <span className={`toast-icon ${iconClass}`} />
            </div>
          </div>
        )}
    </>
  );
};

export default Toast;
