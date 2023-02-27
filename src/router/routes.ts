import type { RouteModule, RoutesType } from '~/types/router'
const basicRoutes: RoutesType = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

const routeModules = import.meta.glob('@/views/*/route.ts', {
  eager: true
}) as RouteModule
const asyncRoutes: RoutesType = []

Object.keys(routeModules).forEach((key) => {
  asyncRoutes.push(routeModules[key].default)
})

export { basicRoutes, asyncRoutes }
