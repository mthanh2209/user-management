import { Outlet, useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

// Components
import { Drawer, Toast } from '@components';

// Constants
import { API, PATH, POPPER_OPTION } from '@constants';

// Services
import { addUser } from '@services';

// Stores
import { Context } from '@stores';

const Layout = () => {
  const {
    showToast,
    setUsers,
    setShowToast,
    setSelectedRow
  } = Context();

  /**
   * Function to handle displaying or hiding toast messages.
   * @param {boolean} show - Determines whether to display the toast (default: true).
   * @param {boolean} isError - Indicates if the toast is an error message (default: false).
   */
  const handleShowToast = (show = true, isError = false) => {
    setShowToast((prevToast) => ({
      show,
      isError,
      key: prevToast.key + 1
    }));
  };

  /**
   * Adds a new user.
   * @param userName - The name of the user to add.
   */
  const handleAddUser = async (userName: string) => {
    const response = await addUser(userName);

    if (response.data) {
      const updatedUsers = await mutate(`${API.BASE}/${API.USERS}`);

      // Set the updated user state
      setUsers(updatedUsers);

      setSelectedRow({
        index: updatedUsers.length,
        data: updatedUsers[updatedUsers.length - 1]
      });

      handleShowToast(true, false);
    } else {
      handleShowToast(true, true);
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
