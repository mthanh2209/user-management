import { useContext, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';

// Components
import {
  Drawer,
  Loading,
  Toast
} from '@components';

// Constants
import { PATH, TYPES } from '@constants';

// Services
import {
  addRole,
  addUser,
  getRoles,
  getUsers
} from '@services';

// Stores
import { Context } from '@stores';

// Helpers
import { findSelectedIndex } from '@helpers/object';

const Layout = () => {
  const { state, dispatch } = useContext(Context);
  const { toast } = state;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { mutate: mutateUser } = getUsers();
  const { mutate: mutateRole } = getRoles();

  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  /**
   * Adds a new user.
   * @param userName - The name of the user to add.
   */
  const handleAddUser = async (userName: string) => {
    dispatch({ type: TYPES.PROCESSING });

    const response = await addUser(userName);

    if (response.data) {
      const data = await mutateUser();

      dispatch({
        type: TYPES.SELECTED_ROW,
        payload: { index: data.length, data: data[data.length - 1] }
      });

      dispatch({ type: TYPES.SUCCESS });

      setIsDrawerOpen(false);
      navigate(PATH.HOME_PATH);
    } else {
      dispatch({ type: TYPES.ERROR });
    }
  };

  const handleAddRole = async (roleName: string) => {
    dispatch({ type: TYPES.PROCESSING });

    const response = await addRole(roleName);

    if (response.data) {
      const data = await mutateRole();

      dispatch({
        type: TYPES.SELECTED_ROW,
        payload: { index: data.length, data: data[data.length - 1] }
      });

      dispatch({ type: TYPES.SUCCESS });

      setIsDrawerOpen(false);
      navigate(PATH.ROLES_PATH);
    } else {
      dispatch({ type: TYPES.ERROR });
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

  // Helper function to reset the selected row in the table
  const resetSelectedRow = () => {
    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index: 0, data: null }
    });
  };

  /**
   * Navigational items for the application.
   * @type {Array<IItemNav>}
   */
  const navigateItems = [
    {
      id: 0,
      label: 'users',
      onClick: () => {
        resetSelectedRow();
        navigate(PATH.HOME_PATH);
        setIsDrawerOpen(false);
      }
    },
    {
      id: 1,
      label: 'roles',
      onClick: () => {
        resetSelectedRow();
        navigate(PATH.ROLES_PATH);
        setIsDrawerOpen(false);
      }
    },
    {
      id: 2,
      label: 'rules',
      onClick: () => {
        resetSelectedRow();
        navigate(PATH.RULES_PATH);
        setIsDrawerOpen(false);
      }
    }
  ];

  // Index of the selected item in the navigation menu based on the current pathname.
  const itemSelected = findSelectedIndex(navigateItems, location);

  return (
    <>
      <header className='main-header'>
        <span className='icon-menu' onClick={toggleDrawer}></span>
        User Manager
        {toast === 'processing' ? (
          <Loading isProcessing={true} />
        ) : (
          <Toast type={toast} />
        )}
      </header>
      <main className='main-body'>
        <Drawer
          items={navigateItems}
          itemSelected={itemSelected}
          additionalClass={isDrawerOpen ? 'drawer-tablet' : ''}
          onSubmit={handleAdd}
        />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
