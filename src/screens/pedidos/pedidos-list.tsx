import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models/root-store/root-store-context"
import { List, Avatar, Space } from "antd"
import { Link, useHistory } from "react-router-dom"
import { PedidoListItem } from "../../components/pedido-list-item/pedido-list-item"

export const PedidosList = observer(function (props) {
  const { ordersStore } = useStores()
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 6,
        style: { display: "flex" },
      }}
      dataSource={ordersStore.ordersList}
      renderItem={(item) => <PedidoListItem item={item} />}
    />
  )
})
