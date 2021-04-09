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
    responseType: 'blob'
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


export {
  blacklistImport,
  blacklistDownload,
  paymentListUpdate,
  paymentListDetail,
  getPaymentCommons,
  paymentList,
  queryPermissionsByUser,
}



