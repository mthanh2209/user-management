// Components
import TableHeaderCell from '@components/DataDisplay/Table/TableHeader/TableHeaderCell';

// Interfaces
import { IColumnProps } from '@interfaces/columns';

interface ITableHeader<T> {
  columns: IColumnProps<T>[];
}

const TableHeader = <T,>({
  columns
}: ITableHeader<T>): JSX.Element => {
  return (
    <tr className='table-header'>
      {columns.map((column) => (
        <TableHeaderCell key={`table-header-cell-${column.id}`}>
          {column.title}
        </TableHeaderCell>
      ))}
    </tr>
  );
};

export default TableHeader;
