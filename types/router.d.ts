import { RouteRecordRaw } from 'vue-router'

interface Meta {
  title?: string
  icon?: string
  // 说明
  desc?: string
}

interface RouteItem {
  name: string
  path: string
  isHidden?: boolean
  meta?: Meta
  children?: RoutesType
}

type RouteType = RouteRecordRaw & RouteItem

type RoutesType = Array<RouteType>

/** 前端导入的路由模块 */
type RouteModule = Record<string, { default: RouteType }>
