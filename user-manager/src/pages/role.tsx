import {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

// Components
import {
  Avatar,
  EditorRole,
  InformationSidebar,
  Panel,
  Table,
  Toolbar
} from '@components';

// Helpers
import { filterRoles, highlightKeyword } from '@helpers';

// Services
import {
  deleteRole,
  getRoles,
  getRules,
  getUsers
} from '@services';

// Types
import { IColumnProps, IRole } from '@types';

// Constants
import {
  INFO_LIST_VIEW_ROLE,
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
          additionalClass='panel-assign-body-avatar'
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

  const [roleInfoList, setRoleInfoList] = useState<any[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  /**
   * Fetch data from the service.
   */
  const { data: roles, mutate: mutateRoles } = getRoles();
  const { data: rules } = getRules();
  const { data: users } = getUsers();

  /**
   * Effect to update role information list when selectedRow.data changes.
   *
   * @name useEffect
   * @function
   * @param {Function} callback - Callback function to execute.
   * @param {Array} dependencies - Dependencies to watch for changes.
   */
  useEffect(() => {
    if (selectedRow.data) {
      setRoleInfoList(INFO_LIST_VIEW_ROLE(users, rules));
    }
  }, [selectedRow.data]);

  /**
   * Memoized filtered roles based on the search keyword.
   */
  const filteredRoles = useMemo(() => {
    return filterRoles(roles, searchKeyword);
  }, [roles, searchKeyword]);

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
  };

  /**
   * Handles closing the search bar.
   */
  const handleCloseSearchBar = () => {};

  /**
   * Handles the change in the search input.
   */
  const handleChangeSearch = () => {};

  /**
   * Handles toggling the information sidebar.
   */
  const handleTogglePanel = () => {
    setShowSidebar(!showSidebar);
  };

  const handleUpdateRoles = () => {};

  /**
   * Deletes the selected user and updates the user list.
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

  const handleShowToast = () => {};

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
          data={roleInfoList}
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
                  showToast={handleShowToast}
                />
              ),
              title: 'General'
            }
          ]}
          onReturnClick={handleTogglePanel}
        />
      )}
    </>
  );
};

export default RolePage;
