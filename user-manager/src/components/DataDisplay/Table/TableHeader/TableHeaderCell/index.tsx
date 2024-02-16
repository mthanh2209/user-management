interface ITableHeaderCell {
  children?: string;
}

const TableHeaderCell = ({
  children
}: ITableHeaderCell) => (
  <th className='table-header-cell'>
    {children}
  </th>
)

export default TableHeaderCell;
