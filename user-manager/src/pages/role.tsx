import { useMemo, useState } from 'react';

// Components
import Avatar from '@components/DataDisplay/Avatar';
import Table from '@components/DataDisplay/Table';
import Toolbar from '@components/DataDisplay/Toolbar';

// Helpers
import { filterRoles, highlightKeyword } from '@helpers';

// Services
import { getRoles } from '@services';

// Types
import { IColumnProps, IRole } from '@types';

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
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: IRole | null;
  }>({
    index: 0,
    data: null
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  /**
   * Fetch roles data from the service.
   */
  const { data: roles } = getRoles();

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
  };

  /**
   * Handles closing the search bar.
   */
  const handleCloseSearchBar = () => {};

  /**
   * Handles the change in the search input.
   */
  const handleChangeSearch = () => {};

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
    </>
  );
};

export default RolePage;
