import { Collapse, Divider, Layout, Menu } from "antd"
import { Content, Footer, Header } from "antd/lib/layout/layout"
import { CollapseItem } from "../components/collapse/collapse"
import { AddRequestForm } from "./home/add-request-form"
import React, { useEffect } from "react"
import styled from "styled-components"
import { color } from "../utils/colors"
import { colors } from "../colors/colors"
import { observer } from "mobx-react-lite"
import { useStores } from "../models/root-store/root-store-context"
import { ProductsList } from "./home/products-list"
import { useHistory } from "react-router-dom"
import { TopMenu } from "../components/menu/menu"
import { AddPedido } from "./pedidos/add-pedido"
import { PedidosList } from "./pedidos/pedidos-list"
const { Panel } = Collapse

const StyledContent = styled(Content)`
  background-color: ${colors.backgroundPrimary};
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
        <CollapseItem>
          <Panel header="Realizar pedido" key="1">
            <AddPedido />
          </Panel>
          <Panel header="Ver pedidos" key="2">
            <PedidosList />
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>text</p>
          </Panel>
        </CollapseItem>
      </StyledContent>
      <Footer style={{ textAlign: "center" }}>LOGIVA Servicios SA®</Footer>
    </Layout>
  )
})
