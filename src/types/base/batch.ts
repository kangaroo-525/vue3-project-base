import { FormListItem, FormValue, FormRules, Dict } from '@/types/common'

export interface State {
  attrFormatList: Dict[]
  attrOptionsList: Dict[]
  batchDetailFormValues: batchDetailValue[]
  batchDetailFormList: FormListItem[]
  dataSource: DataSource[] | {}
  modalCreateformValue: FormValue
  modalCreateformList: FormListItem[]
  modalCreateformRules: FormRules
  inputCtlList: Dict[]
  isShowCreateModal: boolean
  isShowMasterModal: boolean
  modalTitle: string
  pageNo: number
  pageSize: number
  record: DataSource | null
  refFormList: any[]
  searchFormValue: FormValue
  searchFormList: FormListItem[]
  total: number
}

interface batchDetailValue {
  batchLabelFormat: string
  batchLabelName: string
  batchLabelOption: string
  batchLabelType: string
}
export interface DataSource {
  [key: string]: string | BatchDetail[] | number | null
  batchCode: string
  batchDesc: string
  batchDetails: BatchDetail[]
  createTime: string
  creator: string
  id: string
  lastOperatingTime: string
  lastOperator: string
  masterId: string
  masterName: string
  organizationId: string
  status: number
}

interface BatchDetail {
  batchId: string
  batchLabelFormat: string
  batchLabelName: string
  batchLabelOption: string
  batchLabelType: string
  id: string
}

// SelectMaster Modal
export interface SelectMasterState {
  dataSource: MasterDataSource[]
  isShowModal: boolean
  pagination: Pagination
  searchFormValue: FormValue
  searchFormList: FormListItem[]
  selectedRowKeys: Key[]
}

export interface MasterDataSource {
  contact: string
  contactInfo: string
  createTime: string
  creator: string
  id: string
  lastOperatingTime: string
  lastOperator: string
  masterCode: string
  masterName: string
  organizationId: string
  status: number
}

interface Pagination {
  current: number | undefined
  pageSize: number | undefined
  total: number | undefined
}

export type Key = string | number
