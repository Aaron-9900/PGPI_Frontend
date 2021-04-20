import React, { memo } from "react"
import Logo from "../../assets/logo.png"

import { OrdersModel } from "../../models/orders/orders-model"
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer"
import moment from "moment"
import Table from "./albaran-table"

interface AlbaranProps {
  order: OrdersModel
}
interface AlbaranDateProps {
  order: OrdersModel
}
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    flexWrap: "wrap",
  },
  section: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
  },
  break: {
    flex: 1,
    height: 0,
  },
  secondaryText: {
    fontSize: 10,
  },
  regularText: {
    fontSize: 12,
  },
})

const Section = (props: any) => {
  return <View style={styles.section}>{props.children}</View>
}

const AlbaranDate = (props: AlbaranDateProps): JSX.Element => {
  const { order } = props
  switch (order.agency) {
    case "DHL":
      return (
        <Text style={styles.secondaryText}>
          Fecha de emisión del pedido: {moment(order.createdDate).format("MMMM Do YYYY, h:mm:ss a")}
        </Text>
      )
    case "SEUR":
      return (
        <Text style={styles.secondaryText}>
          Fecha de recepción del pedido: {moment(order.deliveryDate).format("MMMM Do YYYY")}
        </Text>
      )
    case "Correos":
      return (
        <Text style={styles.secondaryText}>
          Fecha de emisión del pedido: {moment(order.createdDate).format("MMMM Do YYYY")}
        </Text>
      )
    default:
      return <></>
  }
}

const AlbaranWeights = (props: AlbaranDateProps) => {
  const { order } = props
  switch (order.agency) {
    case "DHL":
      return <></>
    case "SEUR":
      return <Text style={styles.secondaryText}>Peso: {order.weight.toString()}kg</Text>
    case "Correos":
      return <Text style={styles.secondaryText}>Peso: {order.weight.toString()}kg</Text>
    default:
      return <></>
  }
}

const AlbaranItems = (props: AlbaranDateProps) => {
  const { order } = props
  switch (order.agency) {
    case "DHL":
      return <Table order={order} />
    case "SEUR":
      return <></>
    case "Correos":
      return (
        <Text style={styles.secondaryText}>
          Cantidades totales:{" "}
          {order.ammount.reduce((cb, element) => {
            return cb + element
          }, 0)}
        </Text>
      )
    default:
      return <></>
  }
}

const Albaran = (props: AlbaranProps): JSX.Element => {
  const { order } = props
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Section>
          <Image style={styles.image} src={Logo} />
          <AlbaranDate order={order} />
        </Section>
        <Section>
          <Text style={styles.regularText}>Tipo de envío: {order.type}</Text>
        </Section>
        <Section>
          <Text style={styles.regularText}>ID: {order.id.toString()}</Text>
        </Section>
        <Section>
          <Text style={styles.regularText}>Nombre: {order.name}</Text>
        </Section>
        <Section>
          <Text style={styles.regularText}>Dirección: {order.address}</Text>
        </Section>
        <Section>
          <AlbaranWeights order={order} />
        </Section>
        <Section>
          <AlbaranItems order={order} />
        </Section>
      </Page>
    </Document>
  )
}
export default memo(Albaran)
