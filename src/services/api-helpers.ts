import { cast } from "mobx-state-tree"
import { OrdersModel } from "../models/orders/orders-model"
import { ProductInstance } from "../models/products-model/product-instance"
import { ProductsModel } from "../models/products-model/products-model"

export type BackendProduct = {
  id: number
  cantidad: number
  nombre: string
  cantidad_minima_restock: number
  proveedor: string
  stock: number
  preparacion: number
}
export type BackendProductInstance = {
  id: number
  fila: number
  columna: number
  tipo: "Preparacion" | "Stock"
}

export type BackendOrderInstances = [BackendProductInstance[], any]

type BackendOrderStatus = "PREPARACION" | "PENDIENTE" | "EN CAMINO" | "RECIBIDO"

export type BackendOrder = {
  id: number
  id_producto: string
  id_cliente: number
  cantidad: string
  direccion: string
  estado: BackendOrderStatus
  tipo: string
  agencia: string
  fecha_Entrega: Date
  fecha_Pedido: Date
  cod_postal: number
  peso: number
}
export type BackendPosition = {
  id: number
  id_producto: number
  id_posicion: number
  disponible: number
}
export type BackendPostOrderResponse = [[[[BackendProductInstance, BackendPosition]]], BackendOrder]

function parseState(
  status: BackendOrderStatus,
): "Preparación" | "Pendiente" | "En camino" | "Recibido" {
  switch (status) {
    case "PENDIENTE":
      return "Pendiente"
    case "EN CAMINO":
      return "En camino"
    case "PREPARACION":
      return "Preparación"
    case "RECIBIDO":
      return "Recibido"
  }
}

export function parseProduct(backendProduct: BackendProduct): ProductsModel {
  return cast({
    id: backendProduct.id,
    quantity: backendProduct.cantidad,
    minRestock: backendProduct.cantidad_minima_restock,
    name: backendProduct.nombre,
    provider: backendProduct.proveedor,
    stock: backendProduct.stock,
    preparation: backendProduct.preparacion,
  })
}

export function parseInstance(backendInstance: BackendProductInstance): ProductInstance {
  return {
    id: backendInstance.id,
    col: backendInstance.columna,
    row: backendInstance.fila,
    type: backendInstance.tipo,
  }
}

export function parseOrder(backendOrder: BackendOrder): OrdersModel {
  return cast({
    id: backendOrder.id,
    product: backendOrder.id_producto.split(",").map((id) => parseInt(id)),
    address: backendOrder.direccion,
    clientId: backendOrder.id_cliente,
    orderStatus: parseState(backendOrder.estado),
    ammount: backendOrder.cantidad.split(",").map((ammount) => parseInt(ammount)),
    type: backendOrder.tipo,
    postalCode: backendOrder.cod_postal,
    agency: backendOrder.agencia,
    weight: backendOrder.peso,
    createdDate: backendOrder.fecha_Pedido,
    deliveryDate: backendOrder.fecha_Entrega,
  })
}

export function parseProducts(backendProducts: BackendProduct[]): ProductsModel[] {
  return backendProducts.map((product) => parseProduct(product))
}

export function parseInstances(backendInstances: BackendProductInstance[]): ProductInstance[] {
  return backendInstances.map((instance) => parseInstance(instance))
}
export function parseOrderInstances(
  backendOrderInstances: BackendOrderInstances,
): ProductInstance[] {
  console.log(backendOrderInstances)
  return parseInstances(backendOrderInstances[0])
}
export function parseOrders(backendOrders: BackendOrder[]): OrdersModel[] {
  console.log(backendOrders)
  return backendOrders.map((order) => parseOrder(order))
}
