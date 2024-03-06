import React, { createContext } from 'react';

import { ToastState } from '@stores/toast/reducer';

interface ContextProps {
  selectedRow: { index: number; data: any | null };
  setSelectedRow: (selectedRow: { index: number; data: any | null }) => void;
  userInfoList: any[];
  setUserInfoList: React.Dispatch<React.SetStateAction<any>>;
  toast: ToastState;
  setToast: React.Dispatch<ToastState>;
}

const Context = createContext<ContextProps>({
  selectedRow: { index: 0, data: null },
  setSelectedRow: () => {},
  userInfoList: [],
  setUserInfoList: () => {},
  toast: 'idle',
  setToast: () => {}
});

export default Context;
