// import { getAction,deleteAction,putAction,postAction} from '@/api/manage'
import { getAction } from '@/api/manage'
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);

export {
  queryPermissionsByUser,
}



