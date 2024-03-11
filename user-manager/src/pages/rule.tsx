import { useContext, useEffect, useMemo, useState } from 'react';

// Components
import { Table, Toolbar } from '@components';

// Helpers
import { filterRules, highlightKeyword } from '@helpers';

// Services
import { getRoles, getRules, getUsers } from '@services';

// Types
import { IColumnProps, IRule } from '@types';

// Stores
import { Context } from '@stores';
import { INFO_LIST_VIEW_RULE } from '@constants';

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

  const [ruleInfoList, setRuleInfoList] = useState<any[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  /**
   * Fetch data from the service.
   */
  const { data: rules } = getRules();
  const { data: rolesData } = getRoles();
  const { data: usersData } = getUsers();

  useEffect(() => {
    if (selectedRow.data) {
      setRuleInfoList(INFO_LIST_VIEW_RULE(rolesData, usersData));
    }
  }, [selectedRow.data]);

  /**
   * Memoized filtered rules based on the search keyword.
   */
  const filteredRules = useMemo(() => {
    return filterRules(rules, searchKeyword);
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
    </>
  );
};

export default RulePage;
