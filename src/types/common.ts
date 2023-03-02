import type { RuleObject } from 'ant-design-vue/es/form'
import type { ColumnType } from 'ant-design-vue/es/table'
export interface FormListItem {
  [key: string]: any
  type: string
  label?: string
  name: string
  colSpan?: number
  attrs?: FormValue
}

export interface FormRules {
  [k: string]: RuleObject | RuleObject[]
}

export interface FormValue {
  [key: string]: any
}

export interface bodyCellArgs {
  column: ColumnType
  index: number
  text: string | number | null | undefined
  record: any
}

export interface Dict {
  createTime: string
  creator: string
  dataCode: string
  dataDesc: string
  dataName: string
  dataType: string
  id: number
  lastOperatingTime: null | string
  lastOperator: null | string
  status: string
}
