import type { RouteModule, RoutesType } from '~/types/router'
const basicRoutes: RoutesType = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/base',
    name: 'base',
    component: () => import('@/views/base'),
    children: [
      {
        path: 'customer',
        name: 'base-customer',
        component: () => import('@/views/base/customer')
      },
      {
        path: 'batch',
        name: 'base-batch',
        component: () => import('@/views/base/batch')
      }
    ]
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
