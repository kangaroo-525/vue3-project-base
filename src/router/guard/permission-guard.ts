import type { Router } from 'vue-router'
import type { RouteType } from '~/types/router'
import Cookie from 'js-cookie'
import { usePermissionStore } from '@/stores'

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStore()
  router.beforeEach((to) => {
    const accessRoutes = permissionStore.generateRoutes()

    accessRoutes.forEach((route: RouteType) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    if (Cookie.get('token')) {
      return true
    }
    return { ...to, replace: true }
  })
}
