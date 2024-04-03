// 统一管理产品相关接口
import service from "@/utils/request";
import type { coffeeType } from './type';

// 定义管理接口
enum API {
  INVOICELIST_URL = '/coffee/list',
  INVOICEADD_URL = '/coffee/add',
}

enum methodType {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

/** 新增商品 */
const addInvoice = (params: coffeeType) => {
  return service({
    method: methodType.POST,
    url: API.INVOICEADD_URL,
    data: params
  })
};

/** 获取咖啡商品列表数据 */
const getInvoiceList = () => {
  return service<any, coffeeType>({
    method: methodType.GET,
    url: API.INVOICELIST_URL,
  })
};

export {
  addInvoice,
  getInvoiceList
};
