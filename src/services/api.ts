import apisauce, { ApiResponse, ApisauceInstance } from "apisauce"
import Cookies from "universal-cookie/es6"
import { ProductParams } from "../models/products-model/products-store"
import { BackendProduct, parseProduct } from "./api-helpers"
import { getGeneralApiProblem } from "./api-problem"
import { PostProduct } from "./api-types"
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
      },
    })
    // TODO: Delete on deploy
  }

  async addProducts(product: ProductParams): Promise<PostProduct> {
    const response: ApiResponse<BackendProduct> = await this.client.post("/producto/add", {
      nombre: product.name,
      cantidad: product.quantity,
      proveedor: product.provider,
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
}
