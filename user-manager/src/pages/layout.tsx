import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import {
  Drawer,
  Loading,
  Toast
} from '@components';

// Constants
import { PATH, TOAST_TYPE } from '@constants';

// Services
import {
  addRole,
  addUser,
  getRoles,
  getUsers
} from '@services';

// Stores
import { Context } from '@stores';

const Layout = () => {
  const {
    state,
    dispatch,
    setSelectedRow
  } = useContext(Context);
  const { toast } = state;

  const { mutate: mutateUser } = getUsers();
  const { mutate: mutateRole } = getRoles();

  const resetSelectedRow = () => {
    setSelectedRow({ index: 0, data: null });
  };

  /**
   * Adds a new user.
   * @param userName - The name of the user to add.
   */
  const handleAddUser = async (userName: string) => {
    dispatch({ type: TOAST_TYPE.PROCESSING });

    const response = await addUser(userName);

    if (response.data) {
      const data = await mutateUser();

      setSelectedRow({
        index: data.length,
        data: data[data.length - 1]
      });

      dispatch({ type: TOAST_TYPE.SUCCESS });
      navigate(PATH.HOME_PATH);
    } else {
      dispatch({ type: TOAST_TYPE.ERROR });
    }
  };

  const handleAddRole = async (roleName: string) => {
    dispatch({ type: TOAST_TYPE.PROCESSING });

    const response = await addRole(roleName);

    if (response.data) {
      const data = await mutateRole();

      setSelectedRow({
        index: data.length,
        data: data[data.length - 1]
      });

      dispatch({ type: TOAST_TYPE.SUCCESS });
      navigate(PATH.ROLES_PATH);
    } else {
      dispatch({ type: TOAST_TYPE.ERROR });
    }
  };

  const handleAdd = async ({
    type,
    value
  }: {
    type: string;
    value: string;
  }): Promise<void> => {
    switch (type) {
      case 'user':
        handleAddUser(value);
        break;
      case 'role':
        handleAddRole(value);
        break;
      default:
        throw new Error('Invalid type');
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
        resetSelectedRow();
        navigate(PATH.HOME_PATH);
      }
    },
    {
      id: 1,
      label: 'roles',
      onClick: () => {
        resetSelectedRow();
        navigate(PATH.ROLES_PATH);
      }
    },
    {
      id: 2,
      label: 'rules',
      onClick: () => {
        resetSelectedRow();
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
          items={NAVIGATION_ITEMS}
          onSubmit={handleAdd}
        />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
