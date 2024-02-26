import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import Drawer from '@components/DataDisplay/Drawer';
import Toast from '@components/DataDisplay/Toast';

// Constants
import { PATH, POPPER_OPTION } from '@constants';

const Layout = () => {
  const [showToast, setShowToast] = useState({
    show: false,
    isError: false,
    key: 0
  });

  const handleAddUser = () => {};

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
          <Toast
            isError={showToast.isError}
            key={showToast.key}
          />
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
