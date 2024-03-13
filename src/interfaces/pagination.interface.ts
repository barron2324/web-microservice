export interface PaginationInterface {
  page: number
  perPage: number
}

export interface PaginationResponseInterface<T> extends PaginationInterface {
  count: number
  records: T[]
}
