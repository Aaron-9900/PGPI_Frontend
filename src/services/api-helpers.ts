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
  restock: boolean
}
export type BackendProductInstance = {
  id: number
  fila: number
  columna: number
  tipo: "Preparacion" | "Stock"
}
type backendWeirdShit = [number, BackendProductInstance[]]
export type BackendOrderInstances = [backendWeirdShit[], any]

type BackendOrderStatus = "PREPARACION" | "PENDIENTE" | "EN CAMINO" | "RECIBIDO" | "Pendiente"

export type BackendOrder = {
  id: number
  id_producto: string
  id_cliente: number
  cantidad: string
  direccion: string
  estado: BackendOrderStatus
  tipo: string
  agencia: string
  nombre: string
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
export type BackendPostOrderResponse = [[[[BackendProductInstance, BackendPosition]]] | number[], BackendOrder]

function parseState(
  status: BackendOrderStatus,
): "Preparación" | "Pendiente" | "En camino" | "Recibido" {
  switch (status) {
    case "PENDIENTE":
    case "Pendiente":
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
  console.log(backendProduct)
  return cast({
    id: backendProduct.id,
    quantity: backendProduct.cantidad,
    minRestock: backendProduct.cantidad_minima_restock,
    name: backendProduct.nombre,
    provider: backendProduct.proveedor,
    stock: backendProduct.stock,
    preparation: backendProduct.preparacion,
    restock: backendProduct.restock,
  })
}

export function parseInstance(backendInstance: BackendProductInstance): ProductInstance {
  return {
    id: backendInstance.id,
    col: backendInstance.columna,
    row: backendInstance.fila,
    type: backendInstance.tipo,
    product: null,
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
    name: backendOrder.nombre,
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
function parseBackendWeirdShit(bws: backendWeirdShit[]): ProductInstance[] {
  return bws.flatMap((element) => {
    return element[1].map((e) => {
      return {
        ...parseInstance(e),
        product: element[0],
      }
    })
  })
}
export function parseOrderInstances(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  backendOrderInstances: any,
): ProductInstance[] {
  const realItem = backendOrderInstances.slice(0, backendOrderInstances.length - 1) // we dont need last element
  return parseBackendWeirdShit(realItem as backendWeirdShit[])
}
export function parseOrders(backendOrders: BackendOrder[]): OrdersModel[] {
  return backendOrders.map((order) => parseOrder(order))
}
