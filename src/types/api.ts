interface PaginationT {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponseT<T> {
  success: boolean;
  message: string;
  status?: number;
  statusCode?: number;
  error?: string | null;
  pagination?: PaginationT | null;
  data?: T;
}
