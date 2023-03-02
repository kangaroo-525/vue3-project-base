import { request, METHOD } from '@/utils/http'

interface Params {
  [key: string]: string
}
/**
 * 请求文件
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 */
export async function downloadFile(
  resUrl: string,
  params: Params,
  fileName: string
) {
  let paramstr = ''
  for (const key in params) {
    if (paramstr) paramstr += '&'
    paramstr += `${key}=${params[key]}`
  }
  if (paramstr) paramstr = '?' + paramstr
  request(
    `${resUrl}${paramstr ? paramstr : ''}`,
    METHOD.GET,
    {},
    {
      responseType: 'blob'
    }
  )
    .then((res) => {
      return res.blob()
    })
    .then((blob) => {
      const bl = new Blob([blob], { type: 'application/octet-stream' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(bl)
      link.download = fileName
      link.click()
      window.URL.revokeObjectURL(link.href)
    })
}

/**
 * 请求地址
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 */
export async function getFileUrl(resUrl: string, params: Params) {
  return new Promise((resolve, reject) => {
    let paramstr = ''
    for (const key in params) {
      if (paramstr) paramstr += '&'
      paramstr += `${key}=${params[key]}`
    }
    if (paramstr) paramstr = '?' + paramstr
    request(
      `${resUrl}${paramstr ? paramstr : ''}`,
      METHOD.GET,
      {},
      {
        responseType: 'blob'
      }
    )
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        const bl = new Blob([blob], { type: 'application/octet-stream' })
        resolve({
          success: true,
          url: window.URL.createObjectURL(bl)
        })
      })
      .catch((err) => {
        reject({
          success: false,
          error: err
        })
      })
  })
}

/**
 * 根据某个数据类型获取下拉列表
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param dataType 请求参数
 */
export async function sysDictListByDataType(dataType: string) {
  return request('/api/sysDict/sysDictListByDataType', METHOD.GET, { dataType })
}

/**
 * 根据某个数据类型以及状态获取下拉列表
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param dataType 请求参数
 */
export async function sysDictListByDataTypeStatus(params: Params) {
  return request('/api/sysDict/sysDictListByDataTypeStatus', METHOD.GET, params)
}
