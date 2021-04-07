import { getAction,deleteAction,putAction,postAction} from '@/api/manage'
// import { getAction } from '@/api/manage'
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
const getPaymentCommons = () => getAction('/payment-gateway/commons');
const paymentList = (params) => postAction('/payment-gateway',params);

export {
  getPaymentCommons,
  paymentList,
  queryPermissionsByUser,
}



