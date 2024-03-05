// CSS
import '@components/Table/Table.css';

// Components
import TableHeader from "@components/Table/TableHeader";
import TableRow from "@components/Table/TableRow";

// Interfaces
import { IColumnProps } from '@types';

interface ITableProps<T> {
  rowData: T[];
  columns: IColumnProps<T>[];
  additionalClass?: string;
  selectedRowIndex: number;
  onRowClick: (
    index: number,
    item: T
  ) => void;
}

const Table = <T,>({
  rowData,
  columns,
  additionalClass,
  selectedRowIndex,
  onRowClick
}: ITableProps<T>) => {

  return (
    <div className="table-wrapper">
      <table className={`table ${additionalClass}`}>
        <thead className="table-head">
          <TableHeader columns={columns} />
        </thead>

        <tbody className="table-body">
          <TableRow
            rowData={rowData}
            columns={columns}
            selectedRowIndex={selectedRowIndex}
            onRowClick={onRowClick}/>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
