// Components
import TableRowItem from '@components/Table/TableRow/TableRowItem';
import TableRowCell from '@components/Table/TableRow/TableRowCell';

// Interfaces
import { IColumnProps } from '@types';

interface ITableRow<T> {
  rowData: T[];
  columns: IColumnProps<T>[];
  selectedRowIndex: number;
  onRowClick: (
    index: number,
    item: T
  ) => void;
}

const TableRow = <T,>({
  rowData,
  columns,
  selectedRowIndex,
  onRowClick
}: ITableRow<T>) => {
  return (
    <>
      {rowData.map((item, itemIndex) => (
        <TableRowItem
          key={`table-row-${itemIndex}`}
          item={item}
          index={itemIndex}
          selectedRowIndex={selectedRowIndex}
          onRowItemClick={onRowClick}
        >
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </TableRowItem>
      ))}
    </>
  );
};

export default TableRow;
