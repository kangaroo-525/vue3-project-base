import { request, METHOD } from '@/utils/http'

interface Params {
  [key: string]: string
}
/**
 * axios请求
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
 * axios请求
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
