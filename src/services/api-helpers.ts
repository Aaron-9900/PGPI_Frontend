import { cast } from "mobx-state-tree"
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

export function parseProducts(backendProducts: BackendProduct[]): ProductsModel[] {
  return backendProducts.map((product) => parseProduct(product))
}

export function parseInstances(backendInstances: BackendProductInstance[]): ProductInstance[] {
  return backendInstances.map((instance) => parseInstance(instance))
}
