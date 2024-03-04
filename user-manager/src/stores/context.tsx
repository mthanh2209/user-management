import React,
{
  createContext,
  useContext,
  useState
} from 'react';

// Types
import { IUser } from '@types';

interface ISelectedRow {
  index: number;
  data: any | null;
}

interface IToast {
  show: boolean;
  isError: boolean;
  key: number;
}

interface IAppState {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  selectedRow: ISelectedRow;
  setSelectedRow: React.Dispatch<React.SetStateAction<ISelectedRow>>;
  userInfoList: any[];
  setUserInfoList: React.Dispatch<React.SetStateAction<any[]>>;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  showToast: IToast;
  setShowToast: React.Dispatch<React.SetStateAction<IToast>>;
}

const AppContext = createContext<IAppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedRow, setSelectedRow] = useState<ISelectedRow>({
    index: 0,
    data: null
  });
  const [userInfoList, setUserInfoList] = useState<any[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showToast, setShowToast] = useState<IToast>({
    show: false,
    isError: false,
    key: 0
  });

  const contextValues: IAppState = {
    users,
    setUsers,
    selectedRow,
    setSelectedRow,
    userInfoList,
    setUserInfoList,
    showSidebar,
    setShowSidebar,
    searchKeyword,
    setSearchKeyword,
    showToast,
    setShowToast,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

const Context = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Context must be used within an AppProvider');
  }
  return context;
};

export default Context;
