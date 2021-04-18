import { Button, List, Space, Table } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { OrdersModel } from "../../models/orders/orders-model"
import { ProductsModel } from "../../models/products-model/products-model"
import { Typography } from "antd"
import styled from "styled-components"
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer"
import { Albaran } from "../pdf/albaran"

const { Text, Paragraph } = Typography
interface PedidoListProps {
  item: OrdersModel
}
const StyledParagraph = styled(Paragraph)`
  margin-top: 0.5em;
  margin-bottom: 0.5em !important;
`
const StyledListItem = styled(List.Item)`
  display: flex;
  flex-direction: row;
  align-items: center !important;
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
    <StyledListItem key={item.id}>
      <div style={{ flex: 1 }}>
        <List.Item.Meta
          title={
            item.orderStatus === "Preparación" ? (
              <Link to={`/order/${item.id}`}>Dirección: {item.address}</Link>
            ) : (
              <Text>Dirección: {item.address}</Text>
            )
          }
          description={`#ID: ${item.id}`}
        />
        <Text>Productos:</Text>
        {item.product.map((i, idx) => (
          <StyledParagraph key={i.id}>
            Nombre: {i.name} | Cantidad: {item.ammount[idx]}{" "}
            {item.orderStatus === "Pendiente" && i.restock ? (
              <Text type="danger">Necesita restock</Text>
            ) : null}
          </StyledParagraph>
        ))}
        <StyledParagraph>Empresa de envío: {item.agency}</StyledParagraph>
        {item.orderStatus === "Pendiente" ? (
          <Button danger onClick={() => item.setOrderStatus(item.orderStatus)}>
            Hacer reestock
          </Button>
        ) : (
          <Button onClick={() => item.setOrderStatus(item.orderStatus)}>{item.orderStatus}</Button>
        )}
      </div>
      {item.orderStatus === "Recibido" && (
        <div>
          <PDFDownloadLink
            document={<Albaran order={item} />}
            fileName={`albaran_pedido_${item.id}.pdf`}
          >
            <Button type="primary">Descargar albarán</Button>
          </PDFDownloadLink>
        </div>
      )}
    </StyledListItem>
  )
})
