/* eslint-disable @typescript-eslint/no-extra-semi */
import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import { useStores } from "../models/root-store/root-store-context"
import { List, Space, Spin } from "antd"
import styled from "styled-components"

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

export const ProductDetal = observer(function (props) {
  const { productId } = useParams<ProductDetailParams>()
  const { productsStore } = useStores()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const product = productsStore.products.find((p) => p.id === parseInt(productId))!
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
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          itemLayout="vertical"
          size="large"
          dataSource={product.instances}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText icon="Fila: " text={item.row?.toString()} key="list-vertical-star-o" />,
                <IconText
                  icon="Columna: "
                  text={item.col?.toString()}
                  key="list-vertical-like-o"
                />,
                <IconText icon="Preparación: " text="2" key="list-vertical-message" />,
              ]}
            >
              <List.Item.Meta title={product.name + ` #${item.id.toString()}`} />
              {item.type}
            </List.Item>
          )}
        />
      )}
    </div>
  )
})
