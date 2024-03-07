import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import { Drawer, Loading, Toast } from '@components';

// Constants
import { PATH, POPPER_OPTION, TOAST_TYPE } from '@constants';

// Services
import { addUser, getUsers } from '@services';

// Stores
import { Context } from '@stores';

const Layout = () => {
  const { state, dispatch, setSelectedRow } = useContext(Context);
  const { toast } = state;

  const { mutate: mutateUser } = getUsers();

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
    } else {
      dispatch({ type: TOAST_TYPE.ERROR });
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
