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
