import { List, Space } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { OrdersModel } from "../../models/orders/orders-model"
import { ProductsModel } from "../../models/products-model/products-model"

interface PedidoListProps {
  item: OrdersModel
}
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
      <List.Item.Meta title={<Link to={`/product/${item.id}`}>{item.address}</Link>} />
    </List.Item>
  )
})
