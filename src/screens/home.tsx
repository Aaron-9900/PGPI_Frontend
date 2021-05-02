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
import Title from "antd/lib/typography/Title"
import { TopMenu } from "../components/menu/menu"
const { Panel } = Collapse

const StyledContent = styled(Content)`
  background-color: ${colors.backgroundPrimary};
  padding: 5vh 5vw 5vh 5vw;
`

export const Home = observer(function (): JSX.Element {
  const { productsStore } = useStores()
  const history = useHistory()
  useEffect(() => {
    productsStore.getProducts()
    productsStore.getProviders()
  }, [productsStore])
  return (
    <Layout>
      <Header>
        <TopMenu currentIndex="1" />
      </Header>
      <StyledContent>
        <Title>Agregar productos al stock</Title>
        <AddRequestForm />
        <Title>Productos</Title>
        <ProductsList />
      </StyledContent>
      <Footer style={{ textAlign: "center" }}>LOGIVA Servicios SA®</Footer>
    </Layout>
  )
})
