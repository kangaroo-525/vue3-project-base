import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const Base = defineComponent({
  setup() {
    return {}
  },
  render() {
    return <RouterView />
  }
})

export default Base
