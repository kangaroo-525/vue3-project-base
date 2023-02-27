import { request, METHOD } from '@/utils/http'
// 获取菜单列表
export async function getMenuList() {
  return request('/api/system/menuList', METHOD.GET)
}
