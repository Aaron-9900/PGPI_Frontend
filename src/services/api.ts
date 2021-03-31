import apisauce, { ApiResponse, ApisauceInstance } from "apisauce"
import Cookies from "universal-cookie/es6"
import { AddOrderParams } from "../models/orders/orders-store"
import { ProductParams } from "../models/products-model/products-store"
import {
  BackendOrder,
  BackendPostOrderResponse,
  BackendProduct,
  BackendProductInstance,
  parseInstances,
  parseOrder,
  parseOrders,
  parseProduct,
  parseProducts,
} from "./api-helpers"
import { getGeneralApiProblem } from "./api-problem"
import { GetOrders, GetProductInstances, GetProducts, PostOrder, PostProduct } from "./api-types"
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
    const response: ApiResponse<BackendProduct[]> = await this.client.post("/producto/add", {
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
      return { kind: "ok", product: parseProduct(response.data[0] as BackendProduct) }
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
  async addOrder(order: AddOrderParams): Promise<PostOrder> {
    const response: ApiResponse<BackendPostOrderResponse> = await this.client.post(
      "/pedido/order_pos",
      {
        id_producto: order.productId,
        cantidad: order.ammount,
        id_cliente: 15,
        direccion: order.address,
      },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { kind: "ok", order: parseOrder(response.data[0]! as BackendOrder) }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getOrders(): Promise<GetOrders> {
    const response: ApiResponse<BackendOrder[]> = await this.client.get("/pedido/index")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { kind: "ok", orders: parseOrders(response.data as BackendOrder[]) }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
