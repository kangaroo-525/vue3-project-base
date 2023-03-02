import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import Cookie from 'js-cookie'

export function onReqFulfilled(config: AxiosRequestConfig) {
  config.headers!.token = Cookie.get(import.meta.env.VITE_XSR_NAME) as string
  config.headers!.organizationId = Cookie.get('organizationId') as string
  config.headers!.language = Cookie.get('language') || 'zh_CN'
  const { url, xsrfCookieName } = config
  if (
    url?.indexOf('login') === -1 &&
    xsrfCookieName &&
    !Cookie.get(xsrfCookieName)
  ) {
    message.warning('认证 token 已过期，请重新登录')
  }
  return config
}

export function onReqRejected(error: AxiosError) {
  message.error(error.message)
  return Promise.reject(error)
}

export function onResFulfilled(response: AxiosResponse) {
  if (response.status === 200) {
    const res = response.data
    if (res.code === '502') {
      // routePush('/login')
    } else if (res.code === '500') {
      message.error(res.message)
    } else if (res.code === '401') {
      message.error('无此权限')
    } else if (res.code === '403') {
      message.error('请求被拒绝')
    }
  } else {
    message.error(
      '未知异常！请重试,仍不能操作请联系管理员!!! 详情:' +
        JSON.stringify(response)
    )
  }
  const { data } = response
  return data
}
export function onResRejected(error: AxiosError) {
  const { response } = error
  if (response?.status === 401) {
    message.error('无此权限')
  }
  if (response?.status === 403) {
    message.error('请求被拒绝')
  }
  return Promise.reject(error)
}
