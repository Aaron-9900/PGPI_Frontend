import { Button, Form, Input, List, Select, Space, Spin } from "antd"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ProductsModel } from "../../models/products-model/products-model"
import { Typography } from "antd"
import styled from "styled-components"
import { useStores } from "../../models/root-store/root-store-context"
const { Option } = Select
const { Text } = Typography

interface ProductItemProps {
  item: ProductsModel
}
const IconText = ({ icon, text }: { icon: string; text?: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
)
const StyledButton = styled(Button)`
  margin-left: 10vw;
`
const StyledSpinner = styled(Spin)`
  height: "100%";
  width: "100%";
`
const StyledProviders = styled.div`
  cursor: select;
`
const StyledInput = styled(Input)`
  width: 10% !important;
  margin-top: 10px;
`
export const ProductItem = observer((props: ProductItemProps) => {
  const { item } = props
  const { productsStore } = useStores()
  const [selectProviders, setSelectProviders] = useState(false)
  const [newProvider, setNewProvider] = useState(false)
  return (
    <List.Item
      key={item.id}
      actions={[
        <IconText
          icon="Disponible: "
          text={item.quantity?.toString()}
          key="list-vertical-star-o"
        />,
        <IconText icon="Stock: " text={item.stock?.toString()} key="list-vertical-like-o" />,
        <IconText
          icon="Preparación: "
          text={item.preparation?.toString()}
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        title={
          <Link to={`/product/${item.id}`}>
            {item.name} #{item.id}{" "}
            {item.restock ? <Text type="danger">Necesita restock</Text> : null}
          </Link>
        }
      />
      {!selectProviders && (
        <StyledProviders onClick={() => setSelectProviders(true)}>{item.provider}</StyledProviders>
      )}
      {selectProviders && (
        <Select
          defaultValue={item.provider}
          className="select-after"
          onChange={(val: string) => {
            if (val === "new") {
              setNewProvider(true)
              return
            }
            item.changeProvider(val)
            setSelectProviders(false)
            setNewProvider(false)
          }}
        >
          {productsStore.providers.map((provider) => (
            <Option key={provider.id} value={provider.name}>
              {provider.name}
            </Option>
          ))}
          <Option value={"new"}>Otro</Option>
        </Select>
      )}
      {newProvider && (
        <>
          <Form
            onFinish={async (value: any) => {
              console.log(value)
              await item.changeProvider(value["provider"])
              setSelectProviders(false)
              setNewProvider(false)
            }}
          >
            <Form.Item name="provider">
              <StyledInput
                onChange={(val) => {
                  console.log(val)
                }}
              ></StyledInput>
            </Form.Item>
            <Button htmlType="submit">Aceptar</Button>
          </Form>
        </>
      )}
      {item.restock ? (
        <StyledButton onClick={async () => await item.doRestock()} danger>
          {item.status === "pending" ? (
            <StyledSpinner />
          ) : (
            <Text type="danger">Hacer reestock</Text>
          )}
        </StyledButton>
      ) : null}
    </List.Item>
  )
})
