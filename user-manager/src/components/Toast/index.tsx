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

  useEffect(() => {
    let timer: number;

    if (type === TYPES.SUCCESS || type === TYPES.ERROR) {
      setShowToast(true);

      timer = window.setTimeout(() => {
        setShowToast(false);
      }, LOADING.TIMER_HIDE_LOADING);
    } else {
      setShowToast(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [type]);

  const getMessage = () => {
    switch (type) {
      case TYPES.SUCCESS:
        return 'Done';
      case TYPES.ERROR:
        return 'Fail';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case TYPES.SUCCESS:
        return 'success-icon';
      case TYPES.ERROR:
        return 'error-icon';
      default:
        return '';
    }
  };

  return (
    <>
      {showToast && (
        <div className={`toast-wrapper ${position}`}>
          <div className='toast'>
            <p className='toast-message'>{getMessage()}</p>
            <span className={`toast-icon ${getIcon()}`} />
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
