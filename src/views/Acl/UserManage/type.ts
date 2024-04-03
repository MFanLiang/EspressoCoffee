/** 分页器类型 */
export interface paginationType {
  /** 返回的数据量大小 */
  total?: number;
  /** 当前页 */
  currentPage?: number,
  /** 每页的数量 */
  pageSize?: number,
}

/** 用户角色下拉枚举类型 */
export interface userSelectType {
  value: number;
  label: string;
  disabled?: boolean;
}
