/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
export const AddRequestForm = observer(function (): JSX.Element {
  const { productsStore } = useStores()
  const [err, setErr] = useState<string | null>()
  const [newProduct, setNewProduct] = useState<boolean>()

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={async (value: {
        name: string
        quantity: number
        provider?: string
        newName?: string
      }) => {
        try {
          if (newProduct) {
            const params = {
              name: value.newName!,
              quantity: value.quantity,
              provider: value.provider,
            }
            await productsStore.postProduct(params, true)
          } else {
            await productsStore.postProduct(value)
          }
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
        <StyledSelect
          onChange={(value: any) => {
            console.log(value)
            setNewProduct(value === "new")
          }}
        >
          {productsStore.products.map((product) => (
            <StyledSelectOption key={product.id} value={product.name}>
              {product.name}
            </StyledSelectOption>
          ))}
          <StyledSelectOption value={"new"}>Otro</StyledSelectOption>
        </StyledSelect>
      </Form.Item>
      {newProduct && (
        <>
          <Form.Item
            name="newName"
            label="Nombre del nuevo producto"
            rules={[
              {
                required: true,
                message: "Es necesario que agregues un nombre para el nuevo producto",
              },
            ]}
          >
            <StyledInput></StyledInput>
          </Form.Item>
          <Form.Item
            name="provider"
            label="Proveedor"
            rules={[{ required: true, message: "Es necesario que agregues un proveedor" }]}
          >
            <StyledInput></StyledInput>
          </Form.Item>
        </>
      )}
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
