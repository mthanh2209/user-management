export interface IColumnProps<T> {
  id: string;
  key: keyof T;
  title: string;
  render?: (column: IColumnProps<T>, item: T) => JSX.Element;
}
