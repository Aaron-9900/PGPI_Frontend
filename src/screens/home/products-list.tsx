import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models/root-store/root-store-context"
import { List, Avatar, Space } from "antd"
import { MessageOutlined, LikeOutlined, StarOutlined, StockOutlined } from "@ant-design/icons"
import { Link, useHistory } from "react-router-dom"

const IconText = ({ icon, text }: { icon: string; text?: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
)

export const ProductsList = observer(function (props) {
  const { productsStore } = useStores()
  const history = useHistory()

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 6,
        style: { display: "flex" },
      }}
      dataSource={productsStore.products}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon="Total: " text={item.quantity?.toString()} key="list-vertical-star-o" />,
            <IconText icon="Stock: " text="156" key="list-vertical-like-o" />,
            <IconText icon="Preparación: " text="2" key="list-vertical-message" />,
          ]}
        >
          <List.Item.Meta title={<Link to={`/product/${item.id}`}>{item.name}</Link>} />
          {item.provider}
        </List.Item>
      )}
    />
  )
})
