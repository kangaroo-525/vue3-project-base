import { defineStore } from 'pinia'
import Cookie from 'js-cookie'

export const useI18nStore = defineStore('i18n', () => {
  interface State {
    local: 'zh_CN' | 'en_US' | 'zh_HK'
  }
  const state: State = reactive({
    local: 'zh_CN'
  })
  // 过滤权限函数
  function changeLocal(local: State['local']) {
    state.local = local
    Cookie.set('language', local)
  }
  return {
    state,
    changeLocal
  }
})
