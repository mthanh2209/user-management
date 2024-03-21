import {
  useContext,
  useMemo,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import {
  AssignUserRoles,
  AssignUserRules,
  Avatar,
  EditorProfile,
  Panel,
  Status,
  Table,
  Toolbar,
  InformationSidebar
} from '@components';

// Helpers
import { filterRolesOfUser, filterRulesOfUser } from '@helpers/array';
import { highlightKeyword } from '@helpers/string';
import { filterItem, formatDate } from '@helpers/object';

// Services
import {
  getUsers,
  editUser,
  deleteUser,
  getRoles,
  getUserRoles,
  getUserRules,
  getRules,
  getRoleRules
} from '@services';

// Types
import {
  IColumnProps,
  IRoleRule,
  IUser,
  ItemAssign
} from '@types';

// Constants
import {
  INFO_TYPE,
  PATH,
  TYPES
} from '@constants';

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
  const { state, dispatch } = useContext(Context);
  const { selectedRow } = state;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();

  /**
   * Fetches data.
   */
  const { data: users, mutate: mutateUsers } = getUsers();
  const { data: rolesData } = getRoles();
  const { data: rulesData } = getRules();
  const { data: userRolesData } = getUserRoles();
  const { data: userRulesData } = getUserRules();
  const { data: roleRules } = getRoleRules();

  // Filter the data
  const roles = filterRolesOfUser(
    userRolesData || [],
    rolesData || [],
    selectedRow.data?.id
  );

  const rules = filterRulesOfUser(
    userRulesData || [],
    rulesData || [],
    selectedRow.data?.id
  );

  /**
   * Handles the click event to navigate to the role
   *
   * @param roleId - The ID of the role.
   */
  const handleNavigateToRole = (roleId: number) => () => {
    const roleIndex = rolesData?.findIndex((role) => role.id === roleId);
    const index = roleIndex !== -1 ? roleIndex + 1 : 0;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: rolesData[roleIndex] }
    });
    navigate(PATH.ROLES_PATH);
  };

  /**
   * Handles the click event to navigate to the rule
   *
   * @param ruleId - The ID of the rule.
   */
  const handleNavigateToRule = (ruleId: number) => () => {
    const ruleIndex = rulesData?.findIndex((rule) => rule.id === ruleId);
    const index = ruleIndex !== -1 ? ruleIndex + 1 : 0;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: rulesData[ruleIndex] }
    });
    navigate(PATH.RULES_PATH);
  };

  const infoListViewUser = [
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: 'icon-email',
      title: 'Email:',
      content: selectedRow.data?.email
    },
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: 'icon-date',
      title: 'Last Modified:',
      content:
        selectedRow.data?.lastModifiedDate !== null
          ? formatDate(selectedRow.data?.lastModifiedDate)
          : 'Unknown'
    },
    {
      type: INFO_TYPE.LIST_VIEW,
      content: [
        {
          icon: 'icon-role',
          title: `Roles (${roles.length})`,
          content: roles.map((role) => ({
            text: role?.name,
            onClick: handleNavigateToRole(role?.id!)
          }))
        },
        {
          icon: 'icon-rule',
          title: `Rules (${rules.length})`,
          content: rules.map((rule) => ({
            text: rule?.description,
            onClick: handleNavigateToRule(rule?.id!)
          }))
        }
      ]
    }
  ];

  /**
   * Filters users based on search keyword.
   * @type {IUser[]}
   */
  const filteredUsers = useMemo(() => {
    return filterItem(users, searchKeyword);
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
    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: dataItem }
    });

    if (showSidebar || showSidebar === null) {
      setShowSidebar(true);
    } else if (!showSidebar) {
      setShowSidebar(false);
    }

    if (window.innerWidth <= 768) {
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
    dispatch({ type: TYPES.PROCESSING });

    if (selectedRow.data) {
      const response = await deleteUser(selectedRow.data.id);

      if (response.data) {
        dispatch({
          type: TYPES.SELECTED_ROW,
          payload: { index: 0, data: null }
        });

        mutateUsers();

        dispatch({ type: TYPES.SUCCESS });
      } else {
        dispatch({ type: TYPES.ERROR });
      }
    }
  };

  /**
   * Updates user information based on the changes made and retrieves updated user data.
   * @param {IUser} itemData - Updated user data.
   */
  const handleUpdateUsers = async (itemData: IUser) => {
    dispatch({ type: TYPES.PROCESSING });

    const response = await editUser(itemData);

    if (response.data) {
      dispatch({
        type: TYPES.SELECTED_ROW,
        payload: { index: selectedRow.index, data: itemData }
      });

      mutateUsers();

      setShowSidebar(true);

      dispatch({ type: TYPES.SUCCESS });
    } else {
      dispatch({ type: TYPES.ERROR });
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

  /**
   * Represents the rules assigned to the selected user.
   * @type {ItemAssign[]}
   */
  let userRules: ItemAssign[] = [];

  if (rulesData && userRulesData) {
    userRules = rulesData.map((rule) => {
      /**
       * Checks if the rule is assigned to the selected user.
       * @type {boolean}
       */
      let isAssigned = userRulesData.some(
        (userRule) =>
          userRule.userId === selectedRow.data?.id &&
          userRule.ruleId === rule.id
      );

      // Filter the role rules that match both role and rule of the current iteration
      let rolesAssigned: IRoleRule[] = [];

      if (roleRules && roleRules.length && roles) {
        rolesAssigned = roleRules.filter((item) => {
          const role = roles.find((role) => role && role.id === item.roleId);
          return role && item.ruleId === rule.id;
        });
      }

      // If any roles are assigned, map them to include additional information
      if (rolesAssigned.length) {
        rolesAssigned = rolesAssigned
          .map((item) => {
            const filteredRoles = roles.filter(
              (role) => role?.id === item.roleId
            ); // Filter out potentially undefined roles
            const role = filteredRoles.length ? filteredRoles[0] : undefined; // Get the first role (if any) from the filtered list
            if (role) {
              return {
                ...role
              };
            }
            return null; // Or handle the case where role is undefined
          })
          .filter(Boolean) as any; // Filter out potential null values
      }

      return {
        ...rule,
        isAssigned: isAssigned,
        assignedTo: rolesAssigned
      };
    });
  }

  return (
    <div className='body-content'>
      <div className='content'>
        <Toolbar
          content='Users'
          onClose={handleCloseSearchBar}
          onChange={handleChangeSearch}
        />
        <Table
          rowData={filteredUsers}
          additionalClass='users'
          columns={columns}
          selectedRowIndex={selectedRow.index}
          onRowClick={handleSelectedRow}
        />
      </div>

      {showSidebar && selectedRow.data !== null && (
        <InformationSidebar
          title='User information'
          isActive={selectedRow.data.isActive}
          isShowStatus={true}
          src={selectedRow.data.avatar}
          bgColor={selectedRow.data.bgColor}
          fullName={selectedRow.data.fullName}
          additionalClass='users'
          data={infoListViewUser}
          onShowPanel={handleTogglePanel}
        />
      )}

      {!showSidebar && selectedRow.data !== null && (
        <Panel
          tabs={[
            {
              content: (
                <EditorProfile
                  key={selectedRow.data.id}
                  id={selectedRow.data.id}
                  avatar={selectedRow.data.avatar}
                  fullName={selectedRow.data.fullName}
                  email={selectedRow.data.email}
                  isActive={selectedRow.data.isActive}
                  registeredDate={selectedRow.data.registeredDate}
                  lastModifiedDate={selectedRow.data.lastModifiedDate}
                  details={selectedRow.data.details}
                  bgColor={selectedRow.data.bgColor}
                  onSaveUser={handleUpdateUsers}
                  onDeleteUser={handleDeleteUsers}
                />
              ),
              title: 'General'
            },
            {
              content: (
                <AssignUserRules
                  key={selectedRow.data.id}
                  title={selectedRow.data.fullName}
                  items={userRules}
                />
              ),
              title: 'Rules'
            },
            {
              content: (
                <AssignUserRoles
                  key={selectedRow.data.id}
                  title={selectedRow.data.fullName}
                  items={userRoles}
                />
              ),
              title: 'Roles'
            }
          ]}
          onReturnClick={handleTogglePanel}
        />
      )}
    </div>
  );
};

export default HomePage;
