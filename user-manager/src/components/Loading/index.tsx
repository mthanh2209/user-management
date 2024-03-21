import { useEffect, useState } from 'react';

// CSS
import '@components/Loading/Loading.css';

// Constants
import { LOADING } from '@constants';

interface ILoadingProp {
  isProcessing: boolean;
}

const Loading = ({ isProcessing }: ILoadingProp) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: number;

    if (!isProcessing) {
      setShowLoading(false);
    }

    setShowLoading(true);
    timer = window.setTimeout(() => {
      setShowLoading(false);
    }, LOADING.TIMER_LOADING);

    return () => {
      clearTimeout(timer);
    };
  }, [isProcessing]);

  return (
    <>
      {showLoading && isProcessing && (
        <div className='loading-wrapper'>
          <span className='loading-icon' />
        </div>
      )}
    </>
  );
};

export default Loading;
