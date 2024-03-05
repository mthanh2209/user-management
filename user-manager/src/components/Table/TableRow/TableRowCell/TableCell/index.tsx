interface ITableCell {
  children: JSX.Element | string
}

const TableCell = ({
  children
}: ITableCell) => (
  <td className="table-cell">{children}</td>
)

export default TableCell;
