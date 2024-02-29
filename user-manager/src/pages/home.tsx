import { useEffect, useMemo, useState } from 'react';

// Components
import Avatar from '@components/DataDisplay/Avatar';
import Status from '@components/DataDisplay/Status';
import Table from '@components/DataDisplay/Table';
import Toolbar from '@components/DataDisplay/Toolbar';
import InformationSidebar from '@components/DataDisplay/SideBar';
import Panel from '@components/DataDisplay/Panel';
import EditorProfile from '@components/DataDisplay/EditorProfile';
import AssignRule from '@components/DataDisplay/Assign/AssignRule';

// Helpers
import { filterUsers, highlightKeyword } from '@helpers';

// Services
import {
  getUsers,
  editUser,
  deleteUser
} from '@services';

// Types
import {
  IColumnProps,
  IUser,
  ItemAssign 
} from '@types';

// Constants
import { INFO_LIST } from '@constants';

// Mocks
import { mockData } from '@mocks';

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
      id: '1',
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
      id: '2',
      key: 'isActive',
      title: 'Status',
      /**
       * Renders the user's status.
       * @returns JSX for displaying the user's status.
       */
      render: (_, item) => <Status isActive={item.isActive} />
    },
    {
      id: '3',
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

const HomePage = () => {
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: IUser | null;
  }>({
    index: 0,
    data: null
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [userInfoList, setUserInfoList] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showToast, setShowToast] = useState({
    show: false,
    isError: false,
    key: 0
  });

  /**
   * Function to handle displaying or hiding toast messages.
   * @param {boolean} show - Determines whether to display the toast (default: true).
   * @param {boolean} isError - Indicates if the toast is an error message (default: false).
   */
  const handleShowToast = (show = true, isError = false) => {
    setShowToast({
      show,
      isError,
      key: showToast.key + 1
    });
  };

  /**
   * Triggers an effect when the selectedRow.data changes to update the userInfoList and fetches user data.
   * If selectedRow.data exists, updates the userInfoList based on the selectedRow.data.
   * Always fetches the latest user data by calling handleGetUsers().
   */
  useEffect(() => {
    if (selectedRow.data) {
      setUserInfoList(INFO_LIST(selectedRow.data));
    }
  }, [selectedRow.data]);

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

  /**
   * Handles toggling the information sidebar.
   */
  const handleTogglePanel = () => {
    setShowSidebar(!showSidebar);
  };

  /**
   * Deletes the selected user and updates the user list.
   */
  const handleDeleteUsers = async () => {
    if (selectedRow.data) {
      const response = await deleteUser(selectedRow.data.id);
      if (response.data) {
        setSelectedRow({ index: 0, data: null });
        handleShowToast(true, false);
      } else {
        handleShowToast(true, true);
      }
    }
  };

  /**
   * Updates user information based on the changes made and retrieves updated user data.
   * @param {IUser} itemData - Updated user data.
   */
  const handleUpdateUsers = async (itemData: IUser) => {
    const response = await editUser(itemData);

    if (response.data) {
      setSelectedRow({
        index: selectedRow.index,
        data: response.data
      });
      setShowSidebar(true);
      handleShowToast(true, false);
    } else {
      handleShowToast(true, true);
    }
  };

  const handleCloseSearchBar = () => {};

  const handleChangeSearch = () => {};

  return (
    <>
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

      {showSidebar && selectedRow.data !== null && (
        <InformationSidebar
          title='User information'
          isActive={selectedRow.data.isActive}
          src={selectedRow.data.avatar}
          bgColor={selectedRow.data.bgColor}
          fullName={selectedRow.data.fullName}
          data={userInfoList}
          onShowPanel={handleTogglePanel}
        />
      )}

      {!showSidebar && selectedRow.data !== null && (
        <Panel
          tabs={[
            {
              content: (
                <EditorProfile
                  id={selectedRow.data.id}
                  avatar={selectedRow.data.avatar}
                  fullName={selectedRow.data.fullName}
                  email={selectedRow.data.email}
                  isActive={selectedRow.data.isActive}
                  registeredDate={selectedRow.data.registeredDate}
                  lastVisitedDate={selectedRow.data.lastVisitedDate}
                  details={selectedRow.data.details}
                  bgColor={selectedRow.data.bgColor}
                  onSaveUser={handleUpdateUsers}
                  onDeleteUser={handleDeleteUsers}
                  showToast={handleShowToast}
                />
              ),
              title: 'General'
            },
            {
              content: (
                <AssignRule
                  title='Username'
                  rules={mockData.rules as ItemAssign[]}
                />
              ),
              title: 'Rules'
            }
          ]}
          onReturnClick={handleTogglePanel}
        />
      )}
    </>
  );
};

export default HomePage;
