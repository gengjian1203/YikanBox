// 将接收到的参数，转换为页面跳转路由参数
// strPath 跳转的路径
// objParams 参数对象
export function router2url (strPath: string, objRouter: object) {
  const objParams = objRouter.params;
  let strResult = strPath;
  let isFirstParam = true;

  for (let key in objParams) {
    if (isFirstParam) {
      strResult += `?${key}=${objParams[key]}`;
      isFirstParam = false;
    } else {
      strResult += `&${key}=${objParams[key]}`;
    }
  }

  return strResult;
}

export default router2url;