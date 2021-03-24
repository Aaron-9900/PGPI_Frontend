import { Collapse, Divider, Layout, Menu } from "antd"
import { Content, Footer, Header } from "antd/lib/layout/layout"
import { CollapseItem } from "../components/collapse/collapse"
import { AddRequestForm } from "./home/add-request-form"
import React from "react"
import styled from "styled-components"
import { color } from "../utils/colors"
import { colors } from "../colors/colors"
import { observer } from "mobx-react-lite"
const { Panel } = Collapse

const StyledContent = styled(Content)`
  background-color: ${colors.backgroundPrimary};
`

export const Home = observer(function (): JSX.Element {
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
          <Panel header="Agregar nuevo pedido" key="1">
            <AddRequestForm />
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>text</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>text</p>
          </Panel>
        </CollapseItem>
        <Divider plain>Stock</Divider>
      </StyledContent>
      <Footer style={{ textAlign: "center" }}>UGIVA Servicios SA®</Footer>
    </Layout>
  )
})
