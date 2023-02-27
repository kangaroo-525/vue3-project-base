import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'
import type { RoutesType } from '~/types/router'

export const usePermissionStore = defineStore('permission', () => {
  // 有权限的异步路由
  let accessRoutes: RoutesType = reactive([])

  const routes: ComputedRef<RoutesType> = computed(() =>
    basicRoutes.concat(...accessRoutes)
  )

  const menus: ComputedRef<RoutesType> = computed(() =>
    routes.value.filter((route) => route.name && !route.isHidden)
  )
  // 过滤权限函数
  function generateRoutes() {
    // todo
    accessRoutes = asyncRoutes
    return accessRoutes
  }
  return {
    accessRoutes,
    menus,
    generateRoutes
  }
})
