/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Form, Input, InputNumber, Button, Select, Typography, Spin } from "antd"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
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
const StyledInput = styled(Input)`
  width: 30% !important;
`
const StyledSpinner = styled(Spin)`
  height: "100%";
  width: "100%";
`
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
}
export const AddPedido = observer(function (): JSX.Element {
  const { ordersStore, productsStore } = useStores()
  const [form] = Form.useForm()
  const [err, setErr] = useState<string | null>()
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={async (value: { productId: any; ammount: number; address: string }) => {
        try {
          const params = {
            productId: value.productId,
            ammount: value.ammount,
            address: value.address,
          }
          console.log(value, params)
          await ordersStore.postOrder(params)
          form.resetFields()
        } catch (err) {
          setErr(parseError(err))
        }
      }}
      onFieldsChange={() => ordersStore.setStatus("idle")}
    >
      <Form.Item
        name="productId"
        label="Nombre del producto"
        rules={[{ required: true, message: "Selecciona un producto" }]}
      >
        <StyledSelect
          showSearch
          filterOption={(input, option) =>
            option?.content.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {productsStore.productsList.map((product) => (
            <StyledSelectOption key={product.id} value={product.id} content={product.name}>
              {product.name}
            </StyledSelectOption>
          ))}
        </StyledSelect>
      </Form.Item>
      <Form.Item
        name="ammount"
        label="Cantidad de la orden"
        rules={[{ required: true, message: "Introduce una cantidad" }]}
      >
        <StyledInputNumber />
      </Form.Item>
      <Form.Item
        name="address"
        label="Direccion de la orden"
        rules={[{ required: true, message: "Introduce una direccion" }]}
      >
        <StyledInput />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {ordersStore.status === "pending" ? <StyledSpinner /> : "Añadir"}
        </Button>
      </Form.Item>
      {ordersStore.status === "error" && <Text type="danger">{err}</Text>}
      {ordersStore.status === "done" && <Text type="success">Producto agregado con exito</Text>}
    </Form>
  )
})
