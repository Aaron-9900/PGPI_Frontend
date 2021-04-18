/* eslint-disable @typescript-eslint/no-extra-semi */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useLocation, useParams } from "react-router-dom"
import { useStores } from "../models/root-store/root-store-context"
import { List, Space, Spin } from "antd"
import styled from "styled-components"
import { ProductsModelStore } from "../models/products-model/products-store"
import { OrdersModelStore } from "../models/orders/orders-store"
import { ProductsModel } from "../models/products-model/products-model"
import { OrdersModel } from "../models/orders/orders-model"

interface ProductDetailParams {
  productId: string
}
const IconText = ({ icon, text }: { icon: string; text?: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
)
const StyledSpinner = styled(Spin)`
  height: 100%;
  width: 100%;
  margin-top: 50vh;
  position: "absolute";
`
const StyledSpace = styled(Space)`
  border: solid;
  border-width: 1px;
  border-color: #f0f0f0;
  padding: 7px;
  margin: 5px;
`

export const ProductDetal = observer(function (props) {
  const location = useLocation()
  const { productsStore, ordersStore } = useStores()
  let isProduct = false
  let store: ProductsModelStore | OrdersModelStore
  if (location.pathname.includes("product")) {
    store = productsStore
    isProduct = true
  } else {
    store = ordersStore
  }
  const { productId } = useParams<ProductDetailParams>()
  const product: ProductsModel | OrdersModel =
    // @ts-expect-error Dunno
    store.storeAsList.find((p) => p.id === parseInt(productId)) ?? []
  useEffect(() => {
    ;(async function () {
      await product.getInstances()
    })()
  }, [])
  return (
    <div style={{ padding: "50px" }}>
      {product.status !== "done" ? (
        <StyledSpinner size="large" />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            xxl: 6,
          }}
          itemLayout="vertical"
          size="large"
          dataSource={product.instances as any[]}
          renderItem={(item) => (
            <StyledSpace>
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon="Fila: " text={item.row?.toString()} key="list-vertical-star-o" />,
                  <IconText
                    icon="Columna: "
                    text={item.col?.toString()}
                    key="list-vertical-like-o"
                  />,
                ]}
              >
                {isProduct ? (
                  <List.Item.Meta title={product.name + ` #${item.id.toString()}`} />
                ) : (
                  <List.Item.Meta
                    title={
                      productsStore.products.get(item.product)?.name + ` #${item.id.toString()}`
                    }
                  />
                )}
                {item.type}
              </List.Item>
            </StyledSpace>
          )}
        />
      )}
    </div>
  )
})
