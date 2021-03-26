import apisauce, { ApiResponse, ApisauceInstance } from "apisauce"
import Cookies from "universal-cookie/es6"
import { ProductParams } from "../models/products-model/products-store"
import {
  BackendProduct,
  BackendProductInstance,
  parseInstances,
  parseProduct,
  parseProducts,
} from "./api-helpers"
import { getGeneralApiProblem } from "./api-problem"
import { GetProductInstances, GetProducts, PostProduct } from "./api-types"
import { ApiConfig, API_CONFIG } from "./apiconfig"

export class Api {
  client: ApisauceInstance
  config: ApiConfig
  cookies: Cookies

  constructor(config: ApiConfig = API_CONFIG) {
    this.config = config
    this.cookies = new Cookies()
    this.client = apisauce.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
    // TODO: Delete on deploy
  }
  async getProducts(): Promise<GetProducts> {
    const response: ApiResponse<BackendProduct[]> = await this.client.get("/producto/index")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    try {
      return { kind: "ok", product: parseProducts(response.data as BackendProduct[]) }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async addProducts(product: ProductParams): Promise<PostProduct> {
    console.log(product)
    const response: ApiResponse<BackendProduct> = await this.client.post("/producto/add", {
      nombre: product.name,
      cantidad: product.quantity,
      proveedor: product.provider,
      cantidad_minima_restock: product.restockAmmount,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    try {
      return { kind: "ok", product: parseProduct(response.data as BackendProduct) }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getProductInstances(id: number): Promise<GetProductInstances> {
    const response: ApiResponse<
      BackendProductInstance[]
    > = await this.client.get("/posiciones/indexProduct", { id: id })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    try {
      return { kind: "ok", instances: parseInstances(response.data as BackendProductInstance[]) }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
