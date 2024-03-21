import React, { createContext } from 'react';

import { StateProp, initialState } from '@stores/reducer';

interface ContextProps {
  state: StateProp;
  dispatch: React.Dispatch<any>;
}

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {}
});

export default Context;
