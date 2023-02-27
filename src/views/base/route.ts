export default {
  path: '/base',
  name: 'base',
  component: () => import('@/views/base'),
  children: [
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/base/customer')
    }
  ]
}
