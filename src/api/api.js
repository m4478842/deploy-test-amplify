import { getAction,deleteAction,putAction,postAction} from '@/api/manage'
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);

export {
  queryPermissionsByUser,
}



