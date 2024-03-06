import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import {
  Drawer,
  Loading,
  Toast
} from '@components';

// Constants
import { PATH, POPPER_OPTION } from '@constants';

// Services
import { addUser, getUsers } from '@services';

// Stores
import { Context } from '@stores';

const Layout = () => {
  const {
    toast,
    setToast,
    setSelectedRow
  } = useContext(Context);

  const { mutate: mutateUser } = getUsers();

  /**
   * Adds a new user.
   * @param userName - The name of the user to add.
   */
  const handleAddUser = async (userName: string) => {
    setToast('processing');

    const response = await addUser(userName);

    if (response.data) {
      const data = await mutateUser();

      setSelectedRow({
        index: data.length,
        data: data[data.length - 1]
      });

      setToast('success' );
    } else {
      setToast('error');
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
        {toast === 'processing' ? (
          <Loading isProcessing={true} />
        ) : (
          <Toast type={toast} />
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
