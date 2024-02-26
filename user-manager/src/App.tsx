import '@App.css';
import { useMemo, useState } from 'react';

// Components
import Avatar from '@components/DataDisplay/Avatar';
import Drawer from '@components/DataDisplay/Drawer';
import Status from '@components/DataDisplay/Status';
import Table from '@components/DataDisplay/Table';
import Toolbar from '@components/DataDisplay/Toolbar';

// Constants
import { NAVIGATION_ITEMS, POPPER_OPTION } from '@constants';

// Helpers
import { filterUsers, highlightKeyword } from '@helpers';

// Services
import { getUsers } from '@services';

// Types
import { IColumnProps, IUser } from '@types';

/**
 * Generates columns configuration for a user list.
 * @param searchKeyword - The keyword used for highlighting.
 * @returns An array of column configurations for IUser.
 */
const COLUMNS = (searchKeyword: string): IColumnProps<IUser>[] => {
  return [
    {
      id: '0',
      key: 'avatar',
      title: '',
      /**
       * Renders an avatar component.
       * @param _ - Placeholder for column-related data.
       * @param item - The user item for which the avatar is rendered.
       * @returns JSX for displaying an avatar.
       */
      render: (_, item) => (
        <Avatar
          src={item.avatar}
          alt={item.fullName}
          bgColor={item.bgColor}
          size='sm'
        />
      )
    },
    {
      id: '0',
      key: 'fullName',
      title: 'Full Name',
      /**
       * Renders the user's full name with highlighted search keyword.
       * @returns JSX for displaying the full name with highlighted keyword.
       */
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.fullName, searchKeyword)
          }}
        />
      )
    },
    {
      id: '0',
      key: 'isActive',
      title: 'Status',
      /**
       * Renders the user's status.
       * @returns JSX for displaying the user's status.
       */
      render: (_, item) => <Status isActive={item.isActive} />
    },
    {
      id: '0',
      key: 'email',
      title: 'Email',
      /**
       * Renders the user's email with highlighted search keyword.
       * @returns JSX for displaying the email with highlighted keyword.
       */
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.email, searchKeyword)
          }}
        />
      )
    }
  ];
};

/**
 * Main application component managing user data and UI interactions.
 */
const App = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: IUser | null;
  }>({
    index: 0,
    data: null
  });

  /**
   * Fetches user data.
   * @type {IUser[]}
   */
  const { data: users } = getUsers();

  /**
   * Filters users based on search keyword.
   * @type {IUser[]}
   */
  const filteredUsers = useMemo(() => {
    return filterUsers(users, searchKeyword);
  }, [users, searchKeyword]);

  /**
   * Represents the columns configuration based on the search keyword.
   * @type {any}
   */
  const columns = COLUMNS(searchKeyword);

  const handleAddUser = () => {};

  /**
   * Handles selecting a row in the table and displaying user information.
   * @param {number} index - Index of the selected row.
   * @param {IUser} dataItem - Data of the selected user.
   */
  const handleSelectedRow = (index: number, dataItem: IUser): void => {
    setSelectedRow({ index, data: dataItem });
    if (showSidebar || showSidebar === null) {
      setShowSidebar(true);
    } else if (!showSidebar) {
      setShowSidebar(false);
    }
  };

  const handleCloseSearchBar = () => {};

  const handleChangeSearch = () => {};

  return (
    <>
      <header className='main-header'>User Manager</header>
      <main className='main-body'>
        <Drawer
          popoverOption={POPPER_OPTION}
          items={NAVIGATION_ITEMS}
          onSubmit={handleAddUser}
        />

        <div className='body-content'>
          <Toolbar
            onClose={handleCloseSearchBar}
            onChange={handleChangeSearch}
          />

          <Table
            rowData={filteredUsers}
            columns={columns}
            selectedRowIndex={selectedRow.index}
            onRowClick={handleSelectedRow}
          />
        </div>
      </main>
    </>
  );
};

export default App;
