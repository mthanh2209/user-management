// Components
import TableRowItem from "@components/DataDisplay/Table/TableRow/TableRowItem";
import TableRowCell from "@components/DataDisplay/Table/TableRow/TableRowCell";

// Interfaces
import { IColumnProps } from "@interfaces/columns";

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
          onRowItemClick={onRowClick}>

          {columns.map((
              column,
              columnIndex
            ) => (
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
