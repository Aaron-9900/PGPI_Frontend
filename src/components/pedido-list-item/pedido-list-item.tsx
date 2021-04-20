/* eslint-disable react/display-name */
import { Button, List, Modal, Space, Spin, Table } from "antd"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { OrdersModel } from "../../models/orders/orders-model"
import { ProductsModel } from "../../models/products-model/products-model"
import { Typography } from "antd"
import styled from "styled-components"
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer"
import Albaran from "../pdf/albaran"
import { useStores } from "../../models/root-store/root-store-context"

const { Text, Paragraph } = Typography
interface PedidoListProps {
  item: OrdersModel
}
const StyledSpinner = styled(Spin)`
  height: "100%";
  width: "100%";
`
const StyledParagraph = styled(Paragraph)`
  margin-top: 0.5em;
  margin-bottom: 0.5em !important;
`

const parseOrderStatus = (status: string): string => {
  switch (status) {
    case "En camino":
      return "Poner produto como entregado."
    case "Preparación":
      return "Recoger instancias y enviar producto."
  }
  return status
}
const ModalDisplay = observer((props: { item: OrdersModel }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const { item } = props
  useEffect(() => {
    setModalVisible(item.status === "pending" && item.orderStatus === "Pendiente")
  }, [item.status, item.orderStatus])
  return (
    <Modal title="Haciendo reestock" footer={null} closable={false} visible={isModalVisible}>
      <StyledSpinner />
      <p>Haciendo reestock...</p>
    </Modal>
  )
})

function Pdf(props: { row: OrdersModel }) {
  const { ordersStore } = useStores()
  const { row } = props
  return (
    <>
      {row.orderStatus === "Recibido" && ordersStore.status === "done" && (
        <div>
          <PDFDownloadLink
            document={<Albaran order={row} />}
            fileName={`albaran_pedido_${row.id}.pdf`}
          >
            <Button type="primary">Descargar albarán</Button>
          </PDFDownloadLink>
        </div>
      )}
    </>
  )
}

const ActionButton = observer((props: { row: OrdersModel }) => {
  const { row } = props
  if (row.orderStatus === "Pendiente") {
    return (
      <Button danger onClick={async () => await row.setOrderStatus(row.orderStatus)}>
        <Button danger onClick={async () => await row.setOrderStatus(row.orderStatus)}>
          {row.status === "pending" ? null : "Hacer reestock"}
          <ModalDisplay item={row} />
        </Button>
      </Button>
    )
  } else if (row.orderStatus === "Recibido") {
    return <Text> - </Text>
  }
  return (
    <Button onClick={() => row.setOrderStatus(row.orderStatus)}>
      {row.status === "pending" ? <StyledSpinner /> : parseOrderStatus(row.orderStatus)}
    </Button>
  )
})
const Status = observer((props: { row: OrdersModel }) => {
  const { row } = props
  return <StyledParagraph>{row.orderStatus}</StyledParagraph>
})
export const PedidoListItem = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
    // eslint-disable-next-line react/display-name
    render: (address: string, row: OrdersModel) =>
      row.orderStatus === "Preparación" ? (
        <Link to={`/order/${row.id}`}>{row.address}</Link>
      ) : (
        <Text>{row.address}</Text>
      ),
  },
  {
    title: "Productos",
    dataIndex: "product",
    key: "product",
    render: (product: ProductsModel[], row: OrdersModel) =>
      row.product.map((i, idx) => (
        <StyledParagraph key={i.id}>
          Nombre: {i.name} | Cantidad: {row.ammount[idx]}{" "}
          {row.orderStatus === "Pendiente" && i.restock ? (
            <Text type="danger">Necesita restock</Text>
          ) : null}
        </StyledParagraph>
      )),
  },
  {
    title: "Empresa de envío",
    key: "agency",
    dataIndex: "agency",
    render: (agency: string) => <StyledParagraph>{agency}</StyledParagraph>,
  },
  {
    title: "Estado",
    key: "orderStatus",
    dataIndex: "orderStatus",
    render: (_: string, row: OrdersModel) => <Status row={row} />,
  },
  {
    title: "Cambiar estado",
    key: "agency",
    render: (_: string, row: OrdersModel) => <ActionButton row={row} />,
  },
  {
    title: "Descargar albarán",
    key: "albaran",
    render: (row: OrdersModel) => <Pdf row={row} />,
  },
  {
    title: "Descargar ficha de envio",
    key: "envio",
    render: (row: OrdersModel) => <Pdf row={row} />,
  },
]
