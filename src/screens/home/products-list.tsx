import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models/root-store/root-store-context"
import { List, Avatar, Space } from "antd"
import { Link, useHistory } from "react-router-dom"
import { ProductItem } from "../../components/product-item/product-item"

const IconText = ({ icon, text }: { icon: string; text?: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
)

export const ProductsList = observer(function (props) {
  const { productsStore } = useStores()
  console.log("render")
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 6,
        style: { display: "flex" },
      }}
      dataSource={productsStore.storeAsList}
      renderItem={(item) => <ProductItem item={item} />}
    />
  )
})
