import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', () => {
  const state = reactive({
    count: 0
  })

  const doubleCount = computed(() => {
    return state.count * 2
  })
  // 过滤权限函数
  function add() {
    state.count++
  }
  return {
    state,
    doubleCount,
    add
  }
})
