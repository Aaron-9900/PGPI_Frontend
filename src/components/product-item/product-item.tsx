import { Button, List, Space, Spin } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { ProductsModel } from "../../models/products-model/products-model"
import { Typography } from "antd"
import styled from "styled-components"

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
export const ProductItem = observer((props: ProductItemProps) => {
  const { item } = props
  return (
    <List.Item
      key={item.id}
      actions={[
        <IconText icon="Total: " text={item.quantity?.toString()} key="list-vertical-star-o" />,
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
      {item.provider}{" "}
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
