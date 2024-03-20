export interface loginFormType {
  /** 用户名 */
  userName: string;
  /** 密码 */
  password: string;
}

export interface registryInfoType {
  /** 用户名 */
  userName: string;
  /** 用户全名 */
  userFullName: string;
  /** 密码 */
  password: string;
  /** 用户手机号码 */
  tel: string;
  /** 用户角色 */
  userRole: number;
}

export interface userInfo {
  /** id */
  id: string;
  /** 用户名 */
  userName: string;
  /** 用户全称 */
  userFullName: string;
  /** 用户角色 */
  userRole: number;
  /** 用户头像 */
  avatar: string;
  /** 手机号码 */
  tel: string;
  /** 密码 */
  password?: string;
  /** 用户状态 (1 可用状态，0 注销不可用状态) */
  status: number;
  /** 创建时间 */
  createDate: string;
  /** 更新时间 */
  updateDate: string;
}

/** 响应实体参数类型 */
export interface responseBaseType {
  /** 状态码 */
  code: number,
  /** 返回的数据量长度 */
  len?: number;
  /** 返回的信息 */
  message: string;
  /** 返回的数据量大小 */
  total?: number;
  /** 当前页 */
  currentPage?: number,
  /** 每页的数量 */
  pageSize?: number,
  /** token */
  token?: string;
}

/** 登录&单一用户 返回类型 */
export interface loginResponseData extends responseBaseType {
  data: userInfo,
}

/** 所有用户数据类型 */
export interface allUserInfoType extends responseBaseType {
  /** 数据项 */
  data: userInfo[],
}
