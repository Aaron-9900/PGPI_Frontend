import { List, Space } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { ProductsModel } from "../../models/products-model/products-model"

interface ProductItemProps {
  item: ProductsModel
}
const IconText = ({ icon, text }: { icon: string; text?: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
)
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
      <List.Item.Meta title={<Link to={`/product/${item.id}`}>{item.name}</Link>} />
      {item.provider}
    </List.Item>
  )
})
