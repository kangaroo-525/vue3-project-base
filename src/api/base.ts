import { request, METHOD } from '@/utils/http'

// 获取单个批次
export async function goodsBatchGET() {
  return request('/api/base/goodsBatch', METHOD.GET)
}

// 新增或修改批次
export async function goodsBatchPOST(params) {
  return request('/api/base/goodsBatch', METHOD.POST, params)
}

// 获取批次列表
export async function goodsBatchList(params) {
  return request('/api/base/goodsBatchList', METHOD.GET, params)
}

// 启用/禁用批次
export async function updateBatchStatus(params) {
  return request('/api/base/updateBatchStatus', METHOD.GET, params)
}

// 获取货主列表
export async function goodsMasterList(params) {
  return request('/api/base/goodsMasterList', METHOD.GET, params)
}
