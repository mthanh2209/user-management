import {
  useContext,
  useMemo,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import {
  AssignRoleMember,
  AssignRoleRules,
  Avatar,
  EditorRole,
  InformationSidebar,
  Panel,
  Table,
  Toolbar
} from '@components';

// Helpers
import { filterRulesOfRole, filterUsersOfRole } from '@helpers/array';
import { highlightKeyword } from '@helpers/string';
import { filterItem } from '@helpers/object';

// Services
import {
  deleteRole,
  editRole,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  getUsers
} from '@services';

// Types
import {
  IColumnProps,
  IRole,
  ItemAssign
} from '@types';

// Constants
import {
  INFO_TYPE,
  PATH,
  TOAST_TYPE
} from '@constants';

// Stores
import { Context } from '@stores';

/**
 * Column configuration for the roles table.
 *
 * @param searchKeyword - The keyword used for filtering.
 * @returns An array of column configurations.
 */
const COLUMNS = (searchKeyword: string): IColumnProps<IRole>[] => {
  return [
    {
      id: '0',
      key: 'avatar',
      title: '',
      /**
       * Render function for the Avatar column.
       *
       * @param _ - Placeholder for the cell value.
       * @param item - The role data for the current row.
       * @returns JSX element for the Avatar.
       */
      render: (_, item) => (
        <Avatar
          src={item.avatar}
          alt={item.name}
          bgColor={item.bgColor}
          size='sm'
        />
      )
    },
    {
      id: '1',
      key: 'name',
      title: 'Name',
      /**
       * Render function for the Name column.
       *
       * @param _ - Placeholder for the cell value.
       * @param item - The role data for the current row.
       * @returns JSX element for displaying the name with highlighted keyword.
       */
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.name, searchKeyword)
          }}
        />
      )
    }
  ];
};

const RolePage = () => {
  const {
    dispatch,
    selectedRow,
    setSelectedRow
  } = useContext(Context);

  const [showSidebar, setShowSidebar] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  /**
   * Fetch data from the service.
   */
  const { data: rolesData, mutate: mutateRoles } = getRoles();
  const { data: rulesData } = getRules();
  const { data: usersData } = getUsers();
  const { data: roleRulesData } = getRoleRules();
  const { data: roleUsersData } = getUserRoles();

  // Filter the data
  const rules = filterRulesOfRole(
    roleRulesData || [],
    rulesData || [],
    selectedRow.data?.id
  );

  const users = filterUsersOfRole(
    roleUsersData || [],
    usersData || [],
    selectedRow.data?.id
  );

  /**
   * Handles the click event to navigate to the rule
   *
   * @param ruleId - The ID of the rule.
   */
  const handleNavigateToRule = (ruleId: number) => () => {
    const ruleIndex =
      roleRules?.findIndex((roleRule) => roleRule.id === ruleId) ?? -1;
    const index = ruleIndex >= 0 ? ruleIndex + 1 : -1;

    setSelectedRow({ index, data: rulesData[ruleIndex] });
    navigate(PATH.RULES_PATH);
  };

  /**
   * Handles the click event to navigate to the user
   *
   * @param userId - The ID of the user.
   */
  const handleNavigateToUser = (userId: number) => () => {
    const userIndex =
      roleUsers?.findIndex((roleUser) => roleUser.id === userId) ?? -1;
    const index = userIndex >= 0 ? userIndex + 1 : -1;

    setSelectedRow({ index, data: usersData[userIndex] });
    navigate(PATH.HOME_PATH);
  };

  const infoListViewRole = [
    {
      type: INFO_TYPE.LIST_VIEW,
      content: [
        {
          icon: 'icon-rule',
          title: `Rules assigned (${rules.length})`,
          content: rules.map((rule) => ({
            id: rule?.id,
            text: rule?.name,
            onClick: handleNavigateToRule(rule?.id!)
          }))
        },
        {
          icon: 'icon-user',
          title: `Members assigned (${users.length})`,
          content: users.map((user) => ({
            id: user?.id,
            text: user?.fullName,
            onClick: handleNavigateToUser(user?.id!)
          }))
        }
      ]
    }
  ];

  /**
   * Memoized filtered roles based on the search keyword.
   */
  const filteredRoles = useMemo(() => {
    return filterItem(rolesData, searchKeyword);
  }, [rolesData, searchKeyword]);

  /**
   * Column configuration for the roles table.
   */
  const columns = COLUMNS(searchKeyword);

  /**
   * Handles the selection of a row in the table.
   *
   * @param index - Index of the selected row.
   * @param dataItem - Data of the selected row.
   */
  const handleSelectedRow = (index: number, dataItem: IRole): void => {
    setSelectedRow({ index, data: dataItem });
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
   * Handles closing the search bar.
   */
  const handleCloseSearchBar = () => {
    setSearchKeyword('');
  };

  /**
   * Handles searching for roles based on a keyword.
   * @param {string} keyword - The keyword used for filtering roles.
   */
  const handleChangeSearch = (keyword: string): void => {
    setSearchKeyword(keyword);
  };

  /**
   * Handles toggling the information sidebar.
   */
  const handleTogglePanel = () => {
    setShowSidebar(!showSidebar);
  };

  /**
   * Deletes the selected role and updates the role list.
   */
  const handleDeleteRoles = async () => {
    dispatch({ type: TOAST_TYPE.PROCESSING });

    if (selectedRow.data) {
      const response = await deleteRole(selectedRow.data.id);

      if (response.data) {
        setSelectedRow({ index: 0, data: null });

        mutateRoles();

        dispatch({ type: TOAST_TYPE.SUCCESS });
      } else {
        dispatch({ type: TOAST_TYPE.ERROR });
      }
    }
  };

  /**
   * Updates role information based on the changes made and retrieves updated role data.
   * @param {IRole} itemData - Updated role data.
   */
  const handleUpdateRoles = async (itemData: IRole) => {
    dispatch({ type: TOAST_TYPE.PROCESSING });

    const response = await editRole(itemData);

    if (response.data) {
      setSelectedRow({
        index: selectedRow.index,
        data: itemData
      });

      mutateRoles();

      setShowSidebar(true);

      dispatch({ type: TOAST_TYPE.SUCCESS });
    } else {
      dispatch({ type: TOAST_TYPE.ERROR });
    }
  };

  /**
   * Represents the roles assigned to the selected user.
   * @type {ItemAssign[]}
   */
  let roleRules: ItemAssign[] = [];

  if (rulesData && roleRulesData) {
    roleRules = rulesData.map((rule) => {
      /**
       * Checks if the role is assigned to the selected user.
       * @type {boolean}
       */
      let isAssigned = roleRulesData.some(
        (roleRule) =>
          roleRule.roleId === selectedRow.data?.id &&
          roleRule.ruleId === rule.id
      );

      return {
        ...rule,
        isAssigned: isAssigned
      };
    });
  }

  /**
   * Represents the roles assigned to the selected user.
   * @type {ItemAssign[]}
   */
  let roleUsers: ItemAssign[] = [];

  if (usersData && roleUsersData) {
    roleUsers = usersData.map((user) => {
      /**
       * Checks if the role is assigned to the selected user.
       * @type {boolean}
       */
      let isAssigned = roleUsersData.some(
        (roleUser) =>
          roleUser.roleId === selectedRow.data?.id &&
          roleUser.userId === user.id
      );

      return {
        ...user,
        name: user.fullName,
        isAssigned: isAssigned
      };
    });
  }

  return (
    <>
      <div className='body-content'>
        <Toolbar
          content='Roles'
          onClose={handleCloseSearchBar}
          onChange={handleChangeSearch}
        />
        <Table
          rowData={filteredRoles}
          columns={columns}
          selectedRowIndex={selectedRow.index}
          additionalClass='roles'
          onRowClick={handleSelectedRow}
        />
      </div>

      {showSidebar && selectedRow.data !== null && (
        <InformationSidebar
          title='Role information'
          src={selectedRow.data.avatar}
          bgColor={selectedRow.data.bgColor}
          fullName={selectedRow.data.name}
          additionalClass='roles'
          data={infoListViewRole}
          onShowPanel={handleTogglePanel}
        />
      )}

      {!showSidebar && selectedRow.data !== null && (
        <Panel
          tabs={[
            {
              content: (
                <EditorRole
                  key={selectedRow.data.id}
                  id={selectedRow.data.id}
                  name={selectedRow.data.name}
                  bgColor={selectedRow.data.bgColor}
                  onSave={handleUpdateRoles}
                  onDelete={handleDeleteRoles}
                />
              ),
              title: 'General'
            },
            {
              content: (
                <AssignRoleRules
                  key={selectedRow.data.id}
                  title={selectedRow.data.name}
                  items={roleRules}
                />
              ),
              title: 'Rules'
            },
            {
              content: (
                <AssignRoleMember
                  key={selectedRow.data.id}
                  title={selectedRow.data.name}
                  items={roleUsers}
                />
              ),
              title: 'Members'
            }
          ]}
          onReturnClick={handleTogglePanel}
        />
      )}
    </>
  );
};

export default RolePage;
