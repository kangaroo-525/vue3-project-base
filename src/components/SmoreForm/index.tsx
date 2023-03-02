import { defineComponent, renderSlot } from 'vue'
import {
  Form,
  FormItem,
  Row,
  Col,
  Input,
  InputPassword,
  Textarea,
  Select
} from 'ant-design-vue'
import { FormListItem, FormRules, FormValue } from '@/types/common'
import type {FormInstance} from 'ant-design-vue'
// import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'

const props = {
  formValue: {
    type: Object as PropType<FormValue>,
    default: () => {}
  },
  formRules: {
    type: Object as PropType<FormRules>,
    default: () => {}
  },
  formList: {
    type: Array as PropType<FormListItem[]>,
    default: () => []
  },
  labelCol: {
    type: Object,
    default: () => {
      {
        span: 6
      }
    }
  },
  wrapperCol: {
    type: Object,
    default: () => {
      {
        span: 18
      }
    }
  },
  rowGutter: {
    type: Number,
    default: 30
  }
}
const SmoreForm = defineComponent({
  name: 'SmoreForm',
  props,
  setup(props) {
    const smoreForm = ref<FormInstance>()
    const colSpanTotal = computed(() => {
      return props.formList.reduce((tar, cur) => {
        tar += cur.colSpan ? cur.colSpan : 6
        return tar
      }, 0)
    })
    const validateFields = () => {
      return smoreForm.value!.validateFields()
    }
    const resetFields = () => {
      smoreForm.value!.resetFields()
    }
    return {
      smoreForm,
      resetFields,
      validateFields,
      colSpanTotal
    }
  },
  render() {
    const {
      colSpanTotal,
      formValue,
      formRules,
      formList,
      labelCol,
      wrapperCol,
      rowGutter,
      $slots,
      $attrs
    } = this
    return (
      <Form
        model={formValue}
        label-col={labelCol}
        wrapper-col={wrapperCol}
        rules={formRules}
        ref='smoreForm'
        {...$attrs}
      >
        <Row gutter={rowGutter}>
          {formList.map((item) => (
            <Col
              span={item.colSpan ? item.colSpan : 6}
              onClick={() => (item.click ? item.click() : '')}
            >
              {item.type === 'input' ? (
                <FormItem label={item.label} name={item.name}>
                  <Input v-model:value={formValue[item.name]} {...item.attrs} />
                </FormItem>
              ) : item.type === 'textarea' ? (
                <FormItem label={item.label} name={item.name}>
                  <Textarea
                    v-model:value={formValue[item.name]}
                    {...item.attrs}
                  />
                </FormItem>
              ) : item.type === 'select' ? (
                <FormItem label={item.label} name={item.name}>
                  <Select
                    v-model:value={formValue[item.name]}
                    {...item.attrs}
                  ></Select>
                </FormItem>
              ) : item.type === 'password' ? (
                <FormItem label={item.label} name={item.name}>
                  <InputPassword
                    v-model:value={formValue[item.name]}
                    {...item.attrs}
                  />
                </FormItem>
              ) : (
                ''
              )}
            </Col>
          ))}
          {colSpanTotal === 24 ? (
            <Col span={24} style={{ textAlign: 'right' }}>
              {renderSlot($slots, 'default')}
            </Col>
          ) : (
            <Col flex='auto' style={{ textAlign: 'right' }}>
              {renderSlot($slots, 'default')}
            </Col>
          )}
        </Row>
      </Form>
    )
  }
})

export default SmoreForm
