import { Form, Input, InputNumber, Button, Select } from "antd"
import React from "react"
import styled from "styled-components"
const { Option } = Select
const StyledInputNumber = styled(InputNumber)`
  width: 30%;
`
const StyledSelect = styled(Select)`
  width: 30% !important;
`
const StyledSelectOption = styled(Option)`
  width: 30% !important;
`
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
}
export const AddRequestForm = (): JSX.Element => {
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
      <Form.Item
        name="name"
        label="Nombre del producto"
        rules={[{ required: true, message: "Selecciona un producto" }]}
      >
        <StyledSelect>
          <StyledSelectOption value="jack">Jack</StyledSelectOption>
          <StyledSelectOption value="lucy">Lucy</StyledSelectOption>
        </StyledSelect>
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Cantidad"
        rules={[{ required: true, message: "Introduce una cantidad" }]}
      >
        <StyledInputNumber />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Añadir
        </Button>
      </Form.Item>
    </Form>
  )
}
