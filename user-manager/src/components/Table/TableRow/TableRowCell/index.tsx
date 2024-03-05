// Components
import TableCell from "@components/Table/TableRow/TableRowCell/TableCell"

// Interfaces
import { IColumnProps } from "@types";

// Helpers
import { getObjValue } from "@helpers";

interface ITableRowCell<T> {
  item: T,
  column: IColumnProps<T>
}

const TableRowCell = <T,>({
  item,
  column
}: ITableRowCell<T>): JSX.Element => {
  const value = getObjValue(item, column.key as keyof T)

  return (
    <TableCell>
      {column.render
        ? column.render(
          column,
          item )
        : (value as string)}
    </TableCell>
  )
}

export default TableRowCell;
