import { Reducer, useReducer } from 'react';

import { ActionProp, initialState, StateProp } from '@stores/reducer';
import { Context, reducer } from '@stores';

interface ProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<StateProp, ActionProp>>(
    reducer,
    initialState
  );

  // const [selectedRow, setSelectedRow] = useState<{
  //   index: number;
  //   data: any | null;
  // }>({ index: 0, data: null });

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default AppProvider;
