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
export type BackendOrder = {
  id: number
  id_producto: string
  id_cliente: number
  cantidad: string
  direccion: string
  estado: string
}
export type BackendPosition = {
  id: number
  id_producto: number
  id_posicion: number
  disponible: number
}
export type BackendPostOrderResponse = [[[[BackendProductInstance, BackendPosition]]], BackendOrder]

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
    orderStatus: backendOrder.estado,
    ammount: backendOrder.cantidad.split(",").map((ammount) => parseInt(ammount)),
  })
}

export function parseProducts(backendProducts: BackendProduct[]): ProductsModel[] {
  return backendProducts.map((product) => parseProduct(product))
}

export function parseInstances(backendInstances: BackendProductInstance[]): ProductInstance[] {
  return backendInstances.map((instance) => parseInstance(instance))
}

export function parseOrders(backendOrders: BackendOrder[]): OrdersModel[] {
  console.log(backendOrders)
  return backendOrders.map((order) => parseOrder(order))
}
