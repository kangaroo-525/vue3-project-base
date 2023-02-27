export default {
  path: '/system',
  name: 'system',
  component: () => import('@/views/system'),
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user')
    }
  ]
}
