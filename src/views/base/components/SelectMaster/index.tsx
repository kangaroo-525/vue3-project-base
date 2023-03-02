import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import type {
  ColumnsType,
  TablePaginationConfig
} from 'ant-design-vue/es/table'
import SmoreForm from '@/components/SmoreForm'
import { Space, Button, Table, Modal, message } from 'ant-design-vue'
import { goodsMasterList } from '@/api/base'
import { SelectMasterState, Key } from '@/types/base/batch'

const SelectMaster = defineComponent({
  name: 'base-batch',
  emits: ['selected'],
  setup(props, ctx) {
    const i18n = useI18n()
    const t = i18n.t
    const columns: ColumnsType = [
      {
        title: t('base.masterCode'),
        dataIndex: 'masterCode'
      },
      {
        title: t('base.masterName'),
        dataIndex: 'masterName'
      }
    ]
    const state: SelectMasterState = reactive({
      dataSource: [],
      isShowModal: false,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0
      },
      searchFormValue: {
        type: '',
        value: ''
      },
      searchFormList: [
        {
          type: 'select',
          label: '',
          name: 'value',
          colSpan: 7,
          attrs: {
            options: [
              { label: t('base.masterCode'), value: 'masterCode' },
              { label: t('base.masterName'), value: 'masterName' }
            ]
          }
        },
        {
          type: 'input',
          label: '',
          name: 'type',
          colSpan: 10
        }
      ],
      selectedRowKeys: []
    })

    const handleSelectChange = (selectedRowKeys: Key[]) => {
      state.selectedRowKeys = selectedRowKeys
    }
    const handleSearch = () => {
      getDataList()
    }
    const handleReset = () => {
      state.searchFormValue.type = ''
      state.searchFormValue.value = ''
    }
    // 表格change事件
    const handleTableChange = (pagination: TablePaginationConfig) => {
      state.pagination.current = pagination.current
      state.pagination.pageSize = pagination.pageSize
      getDataList()
    }
    // 获取列表数据
    const getDataList = async () => {
      try {
        const res = await goodsMasterList({
          [state.searchFormValue.type]: state.searchFormValue.value,
          pageNo: state.pagination.current,
          pageSize: state.pagination.pageSize
        })

        if (String(res.code) === '200') {
          const { records, total, current } = res.data
          state.pagination.total = total || 0
          state.pagination.current = current || 1
          state.dataSource = records
        } else {
          message.error(res.message)
        }
      } catch (err) {
        message.error(JSON.stringify(err))
      }
    }

    const handleOk = async () => {
      if (state.selectedRowKeys && state.selectedRowKeys.length) {
        const selectedRows = state.dataSource.filter(
          (item) => item.id === state.selectedRowKeys[0]
        )
        ctx.emit('selected', selectedRows[0])
      } else {
        ctx.emit('selected', null)
      }
    }
    return {
      columns,
      state,
      handleOk,
      handleSearch,
      handleReset,
      handleTableChange,
      handleSelectChange,
      t
    }
  },
  render() {
    const {
      columns,
      state,
      handleOk,
      handleSearch,
      handleReset,
      handleTableChange,
      handleSelectChange,
      t
    } = this
    return (
      <Modal title='选择货主' onOk={() => handleOk()}>
        <SmoreForm
          formList={state.searchFormList}
          formValue={state.searchFormValue}
          labelAlign='left'
        >
          <Space size={8}>
            <Button onClick={() => handleSearch()} type='primary'>
              {t('common.search')}
            </Button>
            <Button onClick={() => handleReset()}>{t('common.reset')}</Button>
          </Space>
        </SmoreForm>
        <Table
          rowKey='id'
          size='small'
          columns={columns}
          dataSource={state.dataSource}
          change={(pagination: TablePaginationConfig) =>
            handleTableChange(pagination)
          }
          pagination={false}
          scroll={{ x: 'max-content' }}
          row-selection={{
            type: 'radio',
            selectedRowKeys: state.selectedRowKeys,
            onChange: handleSelectChange
          }}
        />
      </Modal>
    )
  }
})

export default SelectMaster
