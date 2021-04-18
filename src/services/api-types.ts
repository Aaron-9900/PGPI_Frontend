import { OrdersModel } from "../models/orders/orders-model"
import { ProductInstance } from "../models/products-model/product-instance"
import { ProductsModel } from "../models/products-model/products-model"
import { GeneralApiProblem } from "./api-problem"

export type GetUsersResult =
  | {
      kind: "ok"
      response: {
        accessToken: string
        refreshToken: string
        username: string
        id: number
      }
    }
  | GeneralApiProblem
export type PostProduct = { kind: "ok"; product: ProductsModel } | GeneralApiProblem
export type GetProducts = { kind: "ok"; product: ProductsModel[] } | GeneralApiProblem
export type GetProductInstances = { kind: "ok"; instances: ProductInstance[] } | GeneralApiProblem
export type PostOrder = { kind: "ok"; order: OrdersModel } | GeneralApiProblem
export type GetOrders = { kind: "ok"; orders: OrdersModel[] } | GeneralApiProblem
export type PostOrderStatus = { kind: "ok"; status: boolean } | GeneralApiProblem
