import { createI18n } from 'vue-i18n'
import zh from './zh'
import hk from './hk'
import en from './en'

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  // 定义语言
  locale: 'zh_CN',
  messages: {
    zh_CN: zh,
    zh_HK: hk,
    en_US: en
  }
})

export default i18n
