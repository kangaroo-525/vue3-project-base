/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
export function parseUrlParams(url: string) {
  interface obj {
    [key: string]: boolean | string
  }
  const params: obj = {}
  if (!url || url === '' || typeof url !== 'string') {
    return params
  }
  const paramsStr = url.split('?')[1]
  if (!paramsStr) {
    return params
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ')
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1]
    params[paramsArr[i * 2]] =
      value === 'true' ? true : value === 'false' ? false : value
  }
  return params
}
