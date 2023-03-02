import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/es/locale/en_US'
import zh_HK from 'ant-design-vue/es/locale/zh_HK'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-hk'
import { useI18nStore } from '@/stores'
import i18n from '@/language'
import '@/assets/main.css'

const App = defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()

    window.parent.postMessage(
      {
        isReady: true
      },
      '*'
    )
    window.addEventListener('message', function (event) {
      const { path, query } = event.data
      if (path) {
        router.push({
          path,
          query: query ? query : {}
        })
      }
    })

    const locale = ref(zh_CN)
    const i18nState = useI18nStore()
    switch (i18nState.state.local) {
      case 'zh_CN':
        locale.value = zh_CN
        // 多语言
        dayjs.locale('zh-cn')
        i18n.global.locale.value = 'zh_CN'
        break
      case 'en_US':
        locale.value = en_US
        // 多语言
        dayjs.locale('en')
        i18n.global.locale.value = 'en_US'
        break
      case 'zh_HK':
        locale.value = zh_HK
        // 多语言
        dayjs.locale('zh-hk')
        i18n.global.locale.value = 'zh_HK'
        break
    }
    return {
      locale
    }
  },
  render() {
    return (
      <a-config-provider locale={this.locale}>
        <RouterView />
      </a-config-provider>
    )
  }
})

export default App
