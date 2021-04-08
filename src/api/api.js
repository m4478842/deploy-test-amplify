import { getAction,deleteAction,putAction,postAction} from '@/api/manage'
// import { getAction } from '@/api/manage'
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
const getPaymentCommons = () => getAction('/admin/payment-gateway/commons');
const paymentList = (params) => getAction('/admin/payment-gateway',params);
const paymentListDetail = (params) => getAction(`/admin/getdetail/detail`);
const paymentListUpdate = (params) => postAction('/admin/payment-gateway',params);

export {
  paymentListUpdate,
  paymentListDetail,
  getPaymentCommons,
  paymentList,
  queryPermissionsByUser,
}



