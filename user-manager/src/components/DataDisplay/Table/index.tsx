// CSS
import '@components/DataDisplay/Table/Table.css';

// Components
import TableHeader from "@components/DataDisplay/Table/TableHeader";
import TableRow from "@components/DataDisplay/Table/TableRow";

// Interfaces
import { IColumnProps } from '@interfaces/columns';

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
