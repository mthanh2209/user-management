import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import Drawer from '@components/DataDisplay/Drawer';
import Toast from '@components/DataDisplay/Toast';

// Constants
import { PATH, POPPER_OPTION } from '@constants';

// Services
import { addUser, getUsers } from '@services';

// Types
import { IUser } from '@types';

const Layout = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showToast, setShowToast] = useState({
    show: false,
    isError: false,
    key: 0
  });
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: IUser | null;
  }>({
    index: 0,
    data: null
  });

  const handleShowToast = (show = true, isError = false) => {
    setShowToast((prevToast) => ({
      show,
      isError,
      key: prevToast.key + 1
    }));
  };

  const handleAddUser = async (userName: string) => {
    try {
      const response = await addUser(userName);

      if (response.data) {
        const { data } = await getUsers();

        setUsers(data);
        setSelectedRow({
          index: data.length,
          data: data[data.length - 1]
        });
        setShowSidebar(true);
        handleShowToast(true, false);
      } else {
        handleShowToast(true, true);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const navigate = useNavigate();

  /**
   * Navigational items for the application.
   * @type {Array<IItemNav>}
   */
  const NAVIGATION_ITEMS = [
    {
      id: 0,
      label: 'users',
      onClick: () => {
        navigate(PATH.HOME_PATH);
      }
    },
    {
      id: 1,
      label: 'roles',
      onClick: () => {
        navigate(PATH.ROLES_PATH);
      }
    },
    {
      id: 2,
      label: 'rules',
      onClick: () => {
        navigate(PATH.RULES_PATH);
      }
    }
  ];

  return (
    <>
      <header className='main-header'>
        User Manager
        {showToast.show && (
          <Toast isError={showToast.isError} key={showToast.key} />
        )}
      </header>
      <main className='main-body'>
        <Drawer
          popoverOption={POPPER_OPTION}
          items={NAVIGATION_ITEMS}
          onSubmit={handleAddUser}
        />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
