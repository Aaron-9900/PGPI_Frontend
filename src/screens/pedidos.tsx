import { Layout } from "antd"
import { Content, Footer, Header } from "antd/lib/layout/layout"
import React, { useEffect } from "react"
import styled from "styled-components"
import { colors } from "../colors/colors"
import { observer } from "mobx-react-lite"
import { useStores } from "../models/root-store/root-store-context"
import { useHistory } from "react-router-dom"
import { TopMenu } from "../components/menu/menu"
import { AddPedido } from "./pedidos/add-pedido"
import Title from "antd/lib/typography/Title"

import { PedidosList } from "./pedidos/pedidos-list"

const StyledContent = styled(Content)`
  background-color: ${colors.backgroundPrimary};
  padding: 5vh 5vw 5vh 5vw;
`

export const Pedidos = observer(function (): JSX.Element {
  const { ordersStore } = useStores()
  const history = useHistory()
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await ordersStore.getOrders()
    })()
  }, [ordersStore])
  return (
    <Layout>
      <Header>
        <TopMenu currentIndex="2" />
      </Header>
      <StyledContent>
        <Title>Agregar Pedidos</Title>
        <AddPedido />
        <Title>Pedidos</Title>
        <PedidosList />
      </StyledContent>
      <Footer style={{ textAlign: "center" }}>LOGIVA Servicios SA®</Footer>
    </Layout>
  )
})
