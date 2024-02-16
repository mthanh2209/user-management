export interface IColumnProps<T> {
  key: keyof T;
  title: string;
  render?: (column: IColumnProps<T>, item: T) => JSX.Element;
}
