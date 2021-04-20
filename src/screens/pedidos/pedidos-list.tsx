/* eslint-disable react/display-name */
import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models/root-store/root-store-context"
import { Table } from "antd"
import { PedidoListItem } from "../../components/pedido-list-item/pedido-list-item"

export const PedidosList = observer(function (props) {
  const { ordersStore } = useStores()
  return <Table columns={PedidoListItem} rowKey="id" dataSource={[...ordersStore.storeAsList]} />
})
