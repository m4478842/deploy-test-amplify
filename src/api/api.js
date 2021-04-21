import { getAction,deleteAction,putAction,postAction} from '@/api/manage'
import { axios } from '@/utils/request'
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
// 入金通道配置-基础数据
const getPaymentCommons = () => getAction('/admin/payment-gateway/commons');
// 入金通道列表
const paymentList = (params) => getAction('/admin/payment-gateway',params);
// 入金通道详情
const paymentListDetail = (params) => getAction(`/admin/payment-gateway/${params}`);
// 入金通道更新（配置）
const paymentListUpdate = (params) => postAction('/admin/payment-gateway',params);
// 入金通道配置-黑白名单Excel下载
const blacklistDownload = function downFile(parameter){
  return axios({
    url: '/admin/payment-gateway/blacklist/download',
    data: parameter,
    method: 'post' ,
    responseType: 'blob',
    
  })
};
// 入金通道配置-黑白名单Excel上传
const blacklistImport = function downFile(parameter){
  return axios({
    url: '/admin/payment-gateway/blacklist/import',
    data: parameter,
    method: 'post' ,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};
// 通道例外原则-基础数据
const getSpecialCommon = (params) => getAction('/admin/payment-gateway/special-rank/commons',params);
// 通道例外原则-列表
const getSpecialTableList = (params) => getAction('/admin/payment-gateway/special-rank',params);
// 通道例外原则-单个详情
const getSpecialTableListDetail = (params) => getAction(`/admin/payment-gateway/special-rank/${params}`);
// 通道例外原则-新增
const getSpecialTableListAdd = function downFile(parameter){
  return axios({
    url: '/admin/payment-gateway/special-rank',
    data: parameter,
    method: 'put' ,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};
// 通道例外原则-更新
const getSpecialTableListUpdate = function downFile(parameter){
  return axios({
    url: '/admin/payment-gateway/special-rank',
    data: parameter,
    method: 'post' ,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};
// 通道例外原则-删除
const getSpecialTableListDel = (params) => deleteAction(`/admin/payment-gateway/special-rank/${params}`);
// 入金通道配置-黑白名单Excel下载
const specialRankDownload = function downFile(parameter){
  return axios({
    url: '/admin/payment-gateway/special-rank/user/download',
    data: parameter,
    method: 'post' ,
    responseType: 'blob'
  })
};
// API汇率列表
const getAPIRateList = (params) => getAction('/admin/api-exchange-rate',params);
// API汇率更新
const getAPIRateListUpdate = (params) => postAction('/admin/api-exchange-rate',params);
// API汇率详情
const getAPIRateListDetail = (params) => getAction(`/admin/api-exchange-rate/pending-handle/${params}`);
// API汇率更新
const getAPIRateUpdate = (params) => postAction('/admin/api-exchange-rate/pending-handle',params);
// Bank汇率列表
const getBankRateList = (params) => getAction('/admin/bank-exchange-rate',params);
// Bank汇率更新
const getBankRateListUpdate = (params) => postAction('/admin/bank-exchange-rate',params);
// Bank汇率详情
const getBankRateListDetail = (params) => getAction(`/admin/bank-exchange-rate/pending-handle/${params}`);
// Bank汇率更新
const getBankRateUpdate = (params) => postAction('/admin/bank-exchange-rate/pending-handle',params);
// 汇率深度列表
const exchangeRate = (params) => postAction('/admin/exchange-rate-spread-level/query',params);
// 汇率深度详情
const exchangeRateDetail = (params) => getAction(`/admin/exchange-rate-spread-level/${params}`);
// 汇率深度更新
const exchangeRateUpdate = (params) => postAction('/admin/exchange-rate-spread-level',params);

export {
  exchangeRateUpdate,
  exchangeRateDetail,
  exchangeRate,
  getBankRateUpdate,
  getBankRateListDetail,
  getBankRateListUpdate,
  getBankRateList,
  getAPIRateUpdate,
  getAPIRateListDetail,
  getAPIRateListUpdate,
  getAPIRateList,
  specialRankDownload,
  getSpecialTableListDel,
  getSpecialTableListUpdate,
  getSpecialTableListAdd,
  getSpecialTableListDetail,
  getSpecialTableList,
  getSpecialCommon,
  blacklistImport,
  blacklistDownload,
  paymentListUpdate,
  paymentListDetail,
  getPaymentCommons,
  paymentList,
  queryPermissionsByUser,
}



