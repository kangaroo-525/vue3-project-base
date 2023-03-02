import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ColumnsType } from 'ant-design-vue/es/table'
import SmoreForm from '@/components/SmoreForm'
import SelectMaster from '../components/SelectMaster'
import { bodyCellArgs } from '@/types/common'
import { State, DataSource, MasterDataSource } from '@/types/base/batch'
import {
  Space,
  Button,
  Table,
  Pagination,
  Modal,
  message,
  Row,
  Col
} from 'ant-design-vue'
import { sysDictListByDataType } from '@/api/common'
import {
  // goodsBatchGET,
  goodsBatchPOST,
  goodsBatchList,
  updateBatchStatus
} from '@/api/base'
import { postMessage } from '@/utils/utils'
import styles from './batch.module.less'

const batchLabelNameList = ['入库日期', '生产日期', '失效日期', '是否残损']
const columns: ColumnsType = [
  {
    title: '序号',
    dataIndex: 'index'
  },
  {
    title: '货主',
    dataIndex: 'masterName'
  },
  {
    title: '批次属性编码',
    dataIndex: 'batchCode'
  },
  {
    title: '描述',
    dataIndex: 'batchDesc',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]
const Batch = defineComponent({
  name: 'base-batch',
  setup() {
    const i18n = useI18n()
    const t = i18n.t
    const handleShowCargoOwnerModal = () => {
      state.isShowMasterModal = true
    }
    const state: State = reactive({
      attrFormatList: [],
      attrOptionsList: [],
      batchDetailFormValues: [
        {
          batchLabelFormat: '',
          batchLabelName: '入库日期',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '生产日期',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '失效日期',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '是否残损',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性5',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性6',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性7',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性8',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性9',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性10',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性11',
          batchLabelOption: '',
          batchLabelType: ''
        },
        {
          batchLabelFormat: '',
          batchLabelName: '批次属性12',
          batchLabelOption: '',
          batchLabelType: ''
        }
      ],
      batchDetailFormList: [
        {
          lable: '',
          type: 'input',
          name: 'batchLabelName',
          attrs: {
            disabled: true
          }
        },
        {
          lable: '',
          type: 'select',
          name: 'batchLabelType'
        },
        {
          lable: '',
          type: 'select',
          name: 'batchLabelFormat'
        },
        {
          lable: '',
          type: 'select',
          name: 'batchLabelOption'
        }
      ],
      batchDetailRules: {
        batchLabelName: { required: true },
        batchLabelType: { required: true },
        batchLabelFormat: { required: true },
        batchLabelOption: { required: true }
      },
      dataSource: [],
      modalCreateformValue: {
        masterName: '',
        masterId: '',
        batchCode: '',
        batchDesc: ''
      },
      modalCreateformList: [
        {
          type: 'input',
          label: t('base.master'),
          name: 'masterName',
          colSpan: 24,
          click: handleShowCargoOwnerModal
        },
        {
          type: 'input',
          label: t('base.batchCode'),
          name: 'batchCode',
          colSpan: 24,
          attrs: {
            maxlength: 30,
            showCount: true
          }
        },
        {
          type: 'textarea',
          label: t('common.desc'),
          name: 'batchDesc',
          colSpan: 24
        }
      ],
      modalCreateformRules: {
        masterName: { required: true, message: '请选择货主' },
        batchCode: { required: true, message: '请输入批次属性编码' }
      },
      inputCtlList: [],
      isShowCreateModal: false,
      isShowMasterModal: false,
      modalTitle: '新增批次属性',
      pageNo: 1,
      pageSize: 10,
      record: null,
      refFormList: [],
      searchFormValue: {
        batchCode: ''
      },
      searchFormList: [
        {
          type: 'input',
          label: '批次属性编码',
          name: 'batchCode'
        }
      ],
      total: 0
    })

    watch(
      () => state.isShowCreateModal,
      (value) => {
        postMessage(value)
      }
    )
    const handleChangePagination = (page: number, pageSize: number) => {
      state.pageNo = page
      state.pageSize = pageSize
      getDataSource()
    }
    const handleChangeStatus = (record: DataSource) => {
      const content =
        record.status === 1 ? t('base.batchForbidden') : t('base.batchFiring')
      postMessage(true)
      Modal.confirm({
        title: t('common.tip'),
        content,
        okText: t('common.sure'),
        okType: 'primary',
        cancelText: t('common.cancel'),
        onOk: async () => {
          const params = {
            id: record.id,
            status: record.status === 1 ? 0 : 1
          }
          const res = await updateBatchStatus(params)
          if (res && (res.code === '200' || res.code === 200)) {
            const msg =
              params.status === 1
                ? t('base.batchFiringSuccess')
                : t('base.batchForbiddenSuccess')
            message.success(msg, 0.8, () => {
              postMessage(false)
            })
            getDataSource()
          } else {
            message.error(res.message || res.data, 0.8, () => {
              postMessage(false)
            })
          }
        },
        onCancel: () => {
          postMessage(false)
        }
      })
    }
    const handleOk = async () => {
      const formValidateResultList = state.refFormList.reduce((tar, cur) => {
        tar.push(cur.value.validateFields())
        return tar
      }, [])
      try {
        await Promise.all(formValidateResultList)
        let parmas = {}
        const _params = {
          ...state.modalCreateformValue,
          batchDetailParams: state.batchDetailFormValues
        }
        if (state.record) {
          parmas = { ..._params, id: state.record!.id }
        } else {
          parmas = _params
        }
        const result = await goodsBatchPOST(parmas)
        if (String(result.code) === '200') {
          const msg = state.record
            ? t('common.editSuccess')
            : t('common.createSuccess')
          message.success(msg, 0.8, () => {
            state.isShowCreateModal = false
            getDataSource()
          })
        }
      } catch (error) {
        message.error(JSON.stringify(error))
      }
    }
    const handleSearch = () => {
      // todo
      getDataSource()
    }
    const handleReset = () => {
      state.searchFormValue.batchCode = ''
      state.pageNo = 1
      state.pageSize = 10
      getDataSource()
    }
    const handleAdd = () => {
      state.modalTitle = '新增批次属性'
      state.record = null
      state.isShowCreateModal = true
    }
    const handleEdit = (record: DataSource) => {
      state.modalTitle = '修改批次属性'
      state.record = record
      for (const key in state.modalCreateformValue) {
        state.modalCreateformValue[key] = record[key]
      }
      if (record.batchDetails) {
        state.batchDetailFormValues.forEach((item) => {
          record.batchDetails.forEach((it) => {
            if (item.batchLabelName === it.batchLabelName) {
              item = it
            }
          })
        })
      }
      state.isShowCreateModal = true
    }
    const getMaster = (master: MasterDataSource) => {
      state.modalCreateformValue.masterId = master.id
      state.modalCreateformValue.masterName = master.masterName
      state.isShowMasterModal = false
    }
    const getDataSource = async () => {
      try {
        const res = await goodsBatchList({
          ...state.searchFormValue,
          pageNo: state.pageNo,
          pageSize: state.pageSize
        })
        const { records, total, current } = res.data
        state.total = total || 0
        state.pageNo = current || 1
        state.dataSource = records
      } catch (err) {
        message.error(JSON.stringify(err))
      }
    }
    const getSysDictListByDataType = async () => {
      try {
        const res = await sysDictListByDataType('batchFormat')
        const res1 = await sysDictListByDataType('batchType')
        const res2 = await sysDictListByDataType('batchOption')
        state.attrFormatList = res.data
        state.inputCtlList = res1.data
        state.attrOptionsList = res2.data
      } catch (error) {
        message.error(JSON.stringify(error))
      }
    }
    onMounted(() => {
      for (let i = 0, len = state.batchDetailFormValues.length; i <= len; i++) {
        state.refFormList[i] = 'createForm' + 1
        state.refFormList[i] = ref()
      }
      getSysDictListByDataType()
      getDataSource()
    })
    return {
      t,
      state,
      handleChangePagination,
      handleChangeStatus,
      handleOk,
      handleSearch,
      handleReset,
      handleAdd,
      handleEdit,
      getMaster
    }
  },
  render() {
    const {
      t,
      state,
      handleChangePagination,
      handleChangeStatus,
      handleOk,
      handleSearch,
      handleReset,
      handleAdd,
      handleEdit,
      getMaster
    } = this
    return (
      <div class={styles.baseContent}>
        <div class={styles.searchHeader}>
          <SmoreForm
            formList={state.searchFormList}
            formValue={state.searchFormValue}
            labelAlign='left'
          >
            <Space size={8}>
              <Button type='primary' onClick={() => handleSearch()}>
                {t('common.search')}
              </Button>
              <Button onClick={() => handleReset()}>{t('common.reset')}</Button>
              <Button type='primary' onClick={() => handleAdd()}>
                {t('common.add')}
              </Button>
            </Space>
          </SmoreForm>
        </div>
        <div class={styles.tableContent}>
          <Table
            columns={columns}
            data-source={state.dataSource}
            pagination={false}
          >
            {{
              bodyCell: ({ text, index, column, record }: bodyCellArgs) =>
                column.dataIndex === 'index' ? (
                  <span>{index + 1}</span>
                ) : column.dataIndex === 'action' ? (
                  <Space size={8}>
                    <Button type='link' onClick={() => handleEdit(record)}>
                      编辑
                    </Button>
                    <Button
                      type='link'
                      onClick={() => handleChangeStatus(record)}
                    >
                      {record.status === 0 ? '启用' : '禁用'}
                    </Button>
                  </Space>
                ) : column.dataIndex === 'status' ? (
                  <span>{text === 0 ? '禁用' : text === 1 ? '启用' : ''}</span>
                ) : (
                  <span>{text}</span>
                )
            }}
          </Table>
        </div>
        <div class={styles.footer}>
          <Pagination
            v-model:current={state.pageNo}
            v-model:page-size={state.pageSize}
            total={state.total}
            show-total={(total: number) => `共 ${total} 条`}
            change={(page: number, pageSize: number) =>
              handleChangePagination(page, pageSize)
            }
          />
        </div>
        <Modal
          v-model:visible={state.isShowCreateModal}
          title={state.modalTitle}
          onOk={() => handleOk()}
          width={720}
          // getContainer={() => window.parent.document.body}
        >
          <div>
            {/* <span ref='hzlform'>2134</span> */}
            <SmoreForm
              name='createForm0'
              ref={state.refFormList[0]}
              formList={state.modalCreateformList}
              formValue={state.modalCreateformValue}
              formRules={state.modalCreateformRules}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign='left'
            ></SmoreForm>
          </div>
          <div>
            <Row gutter={30} style={{ marginBottom: '16px' }}>
              <Col span={6}>批次标签</Col>
              <Col span={6}>输入控制</Col>
              <Col span={6}>属性格式</Col>
              <Col span={6}>属性选项</Col>
            </Row>
            <div style={{ height: '260px', overflow: 'auto' }}>
              {state.batchDetailFormValues.map((item, index) => (
                <SmoreForm
                  name={'createForm' + index + 1}
                  ref={state.refFormList[index + 1]}
                  formList={[
                    {
                      lable: '',
                      type: 'input',
                      name: 'batchLabelName',
                      attrs: {
                        fieldNames: { label: 'dataName', value: 'dataCode' },
                        disabled: true
                      }
                    },
                    {
                      lable: '',
                      type: 'select',
                      name: 'batchLabelType',
                      attrs: {
                        fieldNames: { label: 'dataName', value: 'dataCode' },
                        options: state.inputCtlList
                      }
                    },
                    {
                      lable: '',
                      type: 'select',
                      name: 'batchLabelFormat',
                      attrs: {
                        fieldNames: { label: 'dataName', value: 'dataCode' },
                        options: state.attrFormatList,
                        disabled: item.batchLabelType === '1'
                      }
                    },
                    {
                      lable: '',
                      type: 'select',
                      name: 'batchLabelOption',
                      attrs: {
                        fieldNames: { label: 'dataName', value: 'dataCode' },
                        options: state.attrOptionsList,
                        disabled: item.batchLabelType === '1'
                      }
                    }
                  ]}
                  formValue={item}
                  formRules={{
                    batchLabelName: { required: true },
                    batchLabelType: {
                      required: batchLabelNameList.includes(item.batchLabelName)
                    },
                    batchLabelFormat: {
                      required:
                        // 如果是前四种 那么当输入控制不是禁用的时候是必填项
                        // 如果不是前四种 那么当输入控制不为空的时候是必填项
                        (batchLabelNameList.includes(item.batchLabelName) &&
                          item.batchLabelType !== '1') ||
                        (!batchLabelNameList.includes(item.batchLabelName) &&
                          item.batchLabelType !== '')
                    },
                    batchLabelOption: {
                      required:
                        (batchLabelNameList.includes(item.batchLabelName) &&
                          item.batchLabelType !== '1') ||
                        (!batchLabelNameList.includes(item.batchLabelName) &&
                          item.batchLabelType !== '')
                    }
                  }}
                ></SmoreForm>
              ))}
            </div>
          </div>
        </Modal>
        <SelectMaster
          v-model:visible={state.isShowMasterModal}
          title='选择货主'
          onSelected={(master: MasterDataSource) => getMaster(master)}
          width={720}
        ></SelectMaster>
      </div>
    )
  }
})

export default Batch
