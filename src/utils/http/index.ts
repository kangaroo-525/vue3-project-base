import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import {
  onReqFulfilled,
  onReqRejected,
  onResFulfilled,
  onResRejected
} from './interceptors'
// import { routePush } from '../router'

// http method
const METHOD = {
  GET: 'get',
  POST: 'post',
  POST1: 'post1',
  PUT: 'put',
  DELETE: 'delete'
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(
  url: string,
  method: string,
  params?: any,
  config?: AxiosRequestConfig
) {
  const service = loadInterceptors()
  switch (method) {
    case METHOD.GET:
      return service.get(url, { params, ...config })
    case METHOD.POST:
      return service.post(url, params, config)
    case METHOD.POST1:
      return service({
        ...config,
        method: METHOD.POST,
        url: url,
        data: params
      })
    case METHOD.PUT:
      return service.put(url, params, config)
    case METHOD.DELETE:
      return service.delete(url, { params, ...config })
    default:
      return service.get(url, { params, ...config })
  }
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors() {
  const defaultOptions = {
    baseURL: '',
    timeout: import.meta.env.VITE_TIME_OUT,
    xsrfHeaderName: import.meta.env.VITE_XSR_NAME,
    xsrfCookieName: import.meta.env.VITE_XSR_NAME
  }
  const service = axios.create({
    ...defaultOptions
  })
  service.interceptors.request.use(onReqFulfilled, onReqRejected)
  service.interceptors.response.use(onResFulfilled, onResRejected)
  return service
}

export { METHOD, request }
