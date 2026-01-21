export interface PageJsonServer<T> {
  first: number,
  prev: number,
  next: number,
  last: number,
  pages: number,
  items: number,
  number: number,
  data: T[]
}
