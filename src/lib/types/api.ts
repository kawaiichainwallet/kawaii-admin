/**
 * API响应统一格式
 */
export interface ApiResponse<T = unknown> {
  code: number;
  msg: string;
  data: T;
  timestamp: string;
  traceId?: string;
}

/**
 * 分页请求参数
 */
export interface PageRequest {
  page: number;
  size: number;
}

/**
 * 分页响应数据
 */
export interface PageResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}
