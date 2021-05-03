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
  cursor: pointer;
`
const StyledInput = styled(Input)`
  width: 10% !important;
  margin-top: 10px;
`
const StyledText = styled(Text)`
  display: flex;
`
export const ProductItem = observer((props: ProductItemProps) => {
  const { item } = props
  const { productsStore } = useStores()
  const [selectProviders, setSelectProviders] = useState(false)
  const [newProvider, setNewProvider] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)
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
          onChange={async (val: string) => {
            if (val === "new") {
              setNewProvider(true)
              return
            }
            setStatusLoading(true)
            try {
              await item.changeProvider(val)
            } catch (err) {}
            setStatusLoading(false)
            setSelectProviders(false)
            setNewProvider(false)
          }}
          loading={statusLoading}
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
              setStatusLoading(true)
              try {
                await item.changeProvider(value["provider"])
              } catch (err) {}
              setStatusLoading(false)
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
            <Button htmlType="submit" loading={statusLoading}>
              Aceptar
            </Button>
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
      {item.status === "error" && <StyledText type="danger">{"Process error"}</StyledText>}
    </List.Item>
  )
})
