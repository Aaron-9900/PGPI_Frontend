import { Button, List, Space, Table } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { OrdersModel } from "../../models/orders/orders-model"
import { ProductsModel } from "../../models/products-model/products-model"
import { Typography } from "antd"
import styled from "styled-components"

const { Text, Paragraph } = Typography
interface PedidoListProps {
  item: OrdersModel
}
const StyledParagraph = styled(Paragraph)`
  margin-top: 0.5em;
  margin-bottom: 0.5em !important;
`
const StyledProductListBody = styled.div``
const IconText = ({ icon, text }: { icon: string; text?: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
)

export const PedidoListItem = observer((props: PedidoListProps) => {
  const { item } = props
  return (
    <List.Item key={item.id}>
      <List.Item.Meta
        title={<Link to={`/product/${item.id}`}>Dirección: {item.address}</Link>}
        description={`#ID: ${item.id}`}
      />
      <Text>Productos:</Text>
      {item.product.map((i, idx) => (
        <StyledParagraph key={i.id}>
          Nombre: {i.name} | Cantidad: {item.ammount[idx]}
        </StyledParagraph>
      ))}
      <Button>{item.orderStatus}</Button>
    </List.Item>
  )
})
