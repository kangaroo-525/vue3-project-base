import { defineComponent } from 'vue'
import { getMenuList } from '@/api/test'
import { useTestStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import styles from './Test.module.less'

const System = defineComponent({
  name: 'System',
  setup() {
    onMounted(() => {
      getMenuList()
    })
    const store = reactive(useTestStore())
    const add = () => {
      store.add()
    }
    const i18n = useI18n()
    return {
      add,
      store,
      $t: i18n.t
    }
  },
  render() {
    const { add, store, $t } = this
    return (
      <div>
        <span class={styles.txt}>this is test{$t('common.success')}</span>
        <div>{store.state.count}</div>
        <div>{store.doubleCount}</div>
        <button
          onClick={() => {
            add()
          }}
        >
          add
        </button>
      </div>
    )
  }
})

export default System
