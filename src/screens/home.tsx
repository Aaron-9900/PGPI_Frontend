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
const { Panel } = Collapse

const StyledContent = styled(Content)`
  background-color: ${colors.backgroundPrimary};
`

export const Home = observer(function (): JSX.Element {
  const { productsStore } = useStores()
  useEffect(() => {
    productsStore.getProducts()
  }, [])
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <StyledContent>
        <CollapseItem>
          <Panel header="Agregar productos" key="1">
            <AddRequestForm />
          </Panel>
          <Panel header="Ver productos" key="2">
            <ProductsList />
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
