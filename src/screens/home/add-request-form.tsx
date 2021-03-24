import { Form, Input, InputNumber, Button, Select, Typography, Spin } from "antd"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import styled from "styled-components"
import { useStores } from "../../models/root-store/root-store-context"
import { parseError } from "../../services/error-parser"
const { Text } = Typography

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
const StyledSpinner = styled(Spin)`
  height: "100%";
  width: "100%";
`
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
}
export const AddRequestForm = observer(function (): JSX.Element {
  const { productsStore } = useStores()
  const [err, setErr] = useState<string | null>()

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={async (value: { name: string; quantity: number }) => {
        try {
          await productsStore.postProduct(value)
        } catch (err) {
          setErr(parseError(err))
        }
      }}
      onFieldsChange={() => productsStore.setStatus("idle")}
    >
      <Form.Item
        name="name"
        label="Nombre del producto"
        rules={[{ required: true, message: "Selecciona un producto" }]}
      >
        <StyledSelect>
          {productsStore.products.map((product) => (
            <StyledSelectOption key={product.id} value={product.name}>
              {product.name}
            </StyledSelectOption>
          ))}
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
          {productsStore.status === "pending" ? <StyledSpinner /> : "Añadir"}
        </Button>
      </Form.Item>
      {productsStore.status === "error" && <Text type="danger">{err}</Text>}
      {productsStore.status === "done" && <Text type="success">Producto agregado con exito</Text>}
    </Form>
  )
})
