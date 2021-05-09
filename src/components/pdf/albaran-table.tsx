import { Page, Text, View, Document, StyleSheet, Canvas } from "@react-pdf/renderer"
import React from "react"
import { OrdersModel } from "../../models/orders/orders-model"

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
})

interface TableProps {
  order: OrdersModel
}

const Table = (props: TableProps): JSX.Element => {
  const { order } = props
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>ID</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Producto</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Cantidad</Text>
        </View>
      </View>
      {order.product.map((product, idx) => {
        return (
          <View key={product.id} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{product.id.toString()}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{product.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.ammount[idx].toString()}</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default Table
