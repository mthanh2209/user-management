import { useReducer, useState } from 'react';

import { toastReducer } from '@stores/toast/reducer';
import Context from '@stores/context';

interface ProviderProps {
  children: React.ReactNode;
}

/**
 * Application-wide provider component managing state and context for the app.
 *
 * @param children - The children components to be wrapped by the provider.
 */
const AppProvider = ({ children }: ProviderProps) => {
  const [toast, setToast] = useReducer(toastReducer, 'idle');

  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: any | null;
  }>({ index: 0, data: null });

  const [userInfoList, setUserInfoList] = useState<any[]>([]);

  /**
   * The context value containing state and setters for the app.
   */
  const value = {
    toast,
    setToast,
    selectedRow,
    setSelectedRow,
    userInfoList,
    setUserInfoList
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AppProvider;
