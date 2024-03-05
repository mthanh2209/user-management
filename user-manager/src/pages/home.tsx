import { useEffect, useMemo } from 'react';

// Components
import Avatar from '@components/DataDisplay/Avatar';
import Status from '@components/DataDisplay/Status';
import Table from '@components/DataDisplay/Table';
import Toolbar from '@components/DataDisplay/Toolbar';
import InformationSidebar from '@components/DataDisplay/SideBar';
import Panel from '@components/DataDisplay/Panel';
import EditorProfile from '@components/DataDisplay/EditorProfile';
import AssignRole from '@components/DataDisplay/Assign/AssignRole';

// Helpers
import {
  filterUsers,
  getUsersAndRoles,
  highlightKeyword
} from '@helpers';

// Services
import {
  getUsers,
  editUser,
  deleteUser,
  getRoles,
  getUserRoles
} from '@services';

// Types
import {
  IColumnProps,
  IRole,
  IUser,
  ItemAssign
} from '@types';

// Constants
import { INFO_LIST_VIEW_USER } from '@constants';

// Stores
import { Context } from '@stores';

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
  const {
    selectedRow,
    setSelectedRow,
    showSidebar,
    setShowSidebar,
    userInfoList,
    setUserInfoList,
    searchKeyword,
    setSearchKeyword,
    showToast,
    setShowToast
  } = Context();

  /**
   * Fetches data.
   */
  const { data: users, mutate: mutateUsers } = getUsers();
  const { data: rolesData } = getRoles();
  const { data: userRolesData } = getUserRoles();

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
   * Retrieves user roles and rules based on user data.
   * @param userId - The ID of the user.
   * @param rolesData - The data containing available roles.
   * @param userRolesData - The data containing user roles.
   * @returns An object containing user roles.
   */
  const { userRolesItem } = getUsersAndRoles(
    selectedRow.data?.id!,
    rolesData!,
    userRolesData!
  );

  /**
   * useEffect hook to update user information list when selected user data changes.
   */
  useEffect(() => {
    if (selectedRow.data) {
      // Filter undefined roles
      const filteredUserRolesItem: IRole[] = (userRolesItem || []).filter(
        (role) => role !== undefined
      ) as IRole[];

      // Set user information list
      setUserInfoList(
        INFO_LIST_VIEW_USER(selectedRow.data, filteredUserRolesItem)
      );
    }
  }, [selectedRow.data]);

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
   * Closes the search bar by resetting the search keyword.
   */
  const handleCloseSearchBar = () => {
    setSearchKeyword('');
  };

  /**
   * Handles searching for users based on a keyword.
   * @param {string} keyword - The keyword used for filtering users.
   */
  const handleChangeSearch = (keyword: string): void => {
    setSearchKeyword(keyword);
  };

  /**
   * Deletes the selected user and updates the user list.
   */
  const handleDeleteUsers = async () => {
    if (selectedRow.data) {
      const response = await deleteUser(selectedRow.data.id);

      if (response.data) {
        setSelectedRow({ index: 0, data: null });

        mutateUsers();

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
        data: itemData
      });

      mutateUsers();

      setShowSidebar(true);

      handleShowToast(true, false);
    } else {
      handleShowToast(true, true);
    }
  };

  /**
   * Represents the roles assigned to the selected user.
   * @type {ItemAssign[]}
   */
  let userRoles: ItemAssign[] = [];

  if (rolesData && userRolesData) {
    userRoles = rolesData.map((role) => {
      /**
       * Checks if the role is assigned to the selected user.
       * @type {boolean}
       */
      let isAssigned = userRolesData.some(
        (userRole) =>
          userRole.userId === selectedRow.data?.id &&
          userRole.roleId === role.id
      );

      return {
        ...role,
        isAssigned: isAssigned
      };
    });
  }

  return (
    <>
      <div className='body-content'>
        <Toolbar
          content='Users'
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
                <AssignRole
                  key={selectedRow.data.id}
                  title={selectedRow.data.fullName}
                  roles={userRoles}
                />
              ),
              title: 'Roles'
            }
          ]}
          onReturnClick={handleTogglePanel}
        />
      )}
    </>
  );
};

export default HomePage;
