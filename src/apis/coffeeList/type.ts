export interface coffeeItem {
  /** 咖啡具名称 */
  name: string;
  /** 颜色值 */
  color: string;
  /** 数量 */
  count: number;
  /** 价格 */
  price: number;
  /** 描述 */
  description: string;
  /** 类型 */
  type: '0' | '1';
  /** 是否需要冲洗 */
  isFlush: '0' | '1';
  /** 是否会变热 */
  isHot: '0' | '1';
  /** 作者 */
  author: '0' | '1';
}

/** 响应实体参数类型 */
export interface responseDataType {
  /** 状态码 */
  code: number,
  /** 返回的数据量长度 */
  len?: number;
  /** 返回的信息 */
  msg: string;
  /** 返回的数据量大小 */
  total?: number;
  /** token */
  token?: string;
}

/** 咖啡商品数据类型 */
export interface coffeeType extends responseDataType {
  /** 数据项 */
  data: coffeeItem[];
}
