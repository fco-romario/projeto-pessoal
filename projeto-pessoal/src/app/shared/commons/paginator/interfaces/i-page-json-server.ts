export interface Page<T> {
  content: T[];
  size: number;
  totalElements: number;
  number: number;
  pageSizeOptions: number[];
}
