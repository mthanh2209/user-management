import React, { createContext } from 'react';

import { StateProp, initialState } from '@stores/toast/reducer';

interface ContextProps {
  state: StateProp;
  dispatch: React.Dispatch<any>;
  selectedRow: { index: number; data: any | null };
  setSelectedRow: (selectedRow: { index: number; data: any | null }) => void;
}

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
  selectedRow: { index: 0, data: null },
  setSelectedRow: () => {},
});

export default Context;
