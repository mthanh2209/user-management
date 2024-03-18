import {
  useContext,
  useMemo,
  useState
} from 'react';

import { useNavigate } from 'react-router-dom';

// Components
import {
  InformationSidebar,
  Table,
  Toolbar
} from '@components';

// Helpers
import {
  filterItem,
  filterRolesOfRule,
  filterUsersOfRule,
  highlightKeyword
} from '@helpers';

// Services
import {
  getRoleRules,
  getRoles,
  getRules,
  getUserRules,
  getUsers
} from '@services';

// Types
import { IColumnProps, IRule } from '@types';

// Stores
import { Context } from '@stores';
import { INFO_TYPE, PATH } from '@constants';

/**
 * Column configuration for the rules table.
 *
 * @param searchKeyword - The keyword used for filtering.
 * @returns An array of column configurations.
 */
const COLUMNS = (searchKeyword: string): IColumnProps<IRule>[] => {
  return [
    {
      id: '0',
      key: 'name',
      title: 'Name',
      /**
       * Render function for the Name column.
       *
       * @param _ - Placeholder for the cell value.
       * @param item - The rule data for the current row.
       * @returns JSX element for displaying the name with highlighted keyword.
       */
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.name, searchKeyword)
          }}
        />
      )
    },
    {
      id: '1',
      key: 'description',
      title: 'Description',
      /**
       * Render function for the Description column.
       *
       * @param _ - Placeholder for the cell value.
       * @param item - The rule data for the current row.
       * @returns JSX element for displaying the name with highlighted keyword.
       */
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.description, searchKeyword)
          }}
        />
      )
    }
  ];
};

const RulePage = () => {
  const { selectedRow, setSelectedRow } = useContext(Context);

  const [showSidebar, setShowSidebar] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  /**
   * Fetch data from the service.
   */
  const { data: rules } = getRules();
  const { data: rolesData } = getRoles();
  const { data: usersData } = getUsers();
  const { data: roleRuleData } = getRoleRules();
  const { data: userRuleData } = getUserRules();

  // Filter the data
  const roles = filterRolesOfRule(
    roleRuleData || [],
    rolesData || [],
    selectedRow.data?.id
  );

  const users = filterUsersOfRule(
    userRuleData || [],
    usersData || [],
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

    setSelectedRow({ index, data: rolesData[roleIndex] });
    navigate(PATH.ROLES_PATH);
  };

  /**
   * Handles the click event to navigate to the user
   *
   * @param userId - The ID of the user.
   */
  const handleNavigateToUser = (userId: number) => () => {
    const userIndex = usersData?.findIndex((user) => user.id === userId);
    const index = userIndex !== -1 ? userIndex + 1 : 0;

    setSelectedRow({ index: index, data: usersData[userIndex] });
    navigate(PATH.HOME_PATH);
  };

  const infoListViewRule = [
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: '',
      title: selectedRow.data?.name,
      content: selectedRow.data?.description
    },
    {
      type: INFO_TYPE.LIST_VIEW,
      content: [
        {
          icon: 'icon-role',
          title: `Roles (${roles.length})`,
          content: roles.map((role) => ({
            id: role?.id,
            text: role?.name,
            onClick: handleNavigateToRole(role?.id!)
          }))
        },
        {
          icon: 'icon-user',
          title: `Users (${users.length})`,
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
   * Memoized filtered rules based on the search keyword.
   */
  const filteredRules = useMemo(() => {
    return filterItem(rules, searchKeyword);
  }, [rules, searchKeyword]);

  /**
   * Column configuration for the rules table.
   */
  const columns = COLUMNS(searchKeyword);

  /**
   * Handles the selection of a row in the table.
   *
   * @param index - Index of the selected row.
   * @param dataItem - Data of the selected row.
   */
  const handleSelectedRow = (index: number, dataItem: IRule): void => {
    setSelectedRow({ index, data: dataItem });
    if (showSidebar || showSidebar === null) {
      setShowSidebar(true);
    } else if (!showSidebar) {
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
   * Handles searching for rules based on a keyword.
   * @param {string} keyword - The keyword used for filtering rules.
   */
  const handleChangeSearch = (keyword: string): void => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <div className='body-content'>
        <Toolbar
          content='Rules'
          onClose={handleCloseSearchBar}
          onChange={handleChangeSearch}
        />
        <Table
          rowData={filteredRules}
          columns={columns}
          selectedRowIndex={selectedRow.index}
          additionalClass='rules'
          onRowClick={handleSelectedRow}
        />
      </div>

      {showSidebar && selectedRow.data !== null && (
        <InformationSidebar
          title='Rule information'
          isShowIcon={false}
          additionalClass='rules'
          data={infoListViewRule}
        />
      )}
    </>
  );
};

export default RulePage;
