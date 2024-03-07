import React, { createContext } from 'react';

import { StateProp, initialState } from '@stores/toast/reducer';

interface ContextProps {
  state: StateProp;
  dispatch: React.Dispatch<any>;
  selectedRow: { index: number; data: any | null };
  setSelectedRow: (selectedRow: { index: number; data: any | null }) => void;
  userInfoList: any[];
  setUserInfoList: React.Dispatch<React.SetStateAction<any>>;
}

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
  selectedRow: { index: 0, data: null },
  setSelectedRow: () => {},
  userInfoList: [],
  setUserInfoList: () => {}
});

export default Context;
