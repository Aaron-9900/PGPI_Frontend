/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable react/display-name */
import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models/root-store/root-store-context"
import { Table } from "antd"
import { PedidoListItem } from "../../components/pedido-list-item/pedido-list-item"
import styled from "styled-components"
import { Typography } from "antd"
import { OrdersModel } from "../../models/orders/orders-model"
import { toJS } from "mobx"

const { Paragraph, Text } = Typography
const StyledParagraph = styled(Paragraph)`
  margin-top: 0.5em;
  margin-bottom: 0.5em !important;
`

const ProductsList = observer((props: { row: OrdersModel }) => {
  const { row } = props
  useEffect(() => {
    ;(async () => await row.getRestockRequired())()
  }, [])

  return (
    <>
      {row.product.map((i, idx) => (
        <StyledParagraph key={i.id}>
          Nombre: {i.name} | Cantidad: {row.ammount[idx]}
          {row.orderStatus === "Pendiente" && row.requiresRestock.indexOf(i.id) > -1 ? (
            <Text type="danger"> Necesita restock</Text>
          ) : null}
        </StyledParagraph>
      ))}
    </>
  )
})

export const PedidosList = observer(function (props) {
  const { ordersStore } = useStores()
  return (
    <Table
      columns={PedidoListItem}
      expandable={{
        expandedRowRender: (record) => <ProductsList row={record} />,
      }}
      rowKey="id"
      dataSource={[...ordersStore.storeAsList]}
    />
  )
})
