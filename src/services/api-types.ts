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
export type EmptyResponse = { kind: "ok" } | GeneralApiProblem
export type GetRestockRequiredByOrder = { kind: "ok"; restockIds: number[] } | GeneralApiProblem
export type PostProduct = { kind: "ok"; product: ProductsModel } | GeneralApiProblem
export type GetProducts = { kind: "ok"; product: ProductsModel[] } | GeneralApiProblem
export type GetProductInstances = { kind: "ok"; instances: ProductInstance[] } | GeneralApiProblem
export type GetProviders =
  | { kind: "ok"; providers: { id: number; name: string }[] }
  | GeneralApiProblem
export type PostOrder =
  | { kind: "ok"; order: OrdersModel; restockId: number[] | any }
  | GeneralApiProblem
export type GetOrders = { kind: "ok"; orders: OrdersModel[] } | GeneralApiProblem
export type PostOrderStatus = { kind: "ok"; status: boolean } | GeneralApiProblem
