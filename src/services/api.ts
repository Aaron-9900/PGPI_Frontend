import apisauce, { ApiResponse, ApisauceInstance } from "apisauce"
import moment from "moment"
import Cookies from "universal-cookie/es6"
import { AddOrderParams } from "../models/orders/orders-store"
import { ProductParams } from "../models/products-model/products-store"
import {
  BackendOrder,
  BackendOrderInstances,
  BackendPostOrderResponse,
  BackendProduct,
  BackendProductInstance,
  parseInstances,
  parseOrder,
  parseOrderInstances,
  parseOrders,
  parseProduct,
  parseProducts,
} from "./api-helpers"
import { getGeneralApiProblem } from "./api-problem"
import {
  GetOrders,
  GetProductInstances,
  GetProducts,
  PostOrder,
  PostOrderStatus,
  PostProduct,
} from "./api-types"
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
      console.log("err")
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { kind: "ok", product: parseProduct(response!.data!) }
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
  async setToOnItsWay(id: number): Promise<PostOrderStatus> {
    const response: ApiResponse<any> = await this.client.post("/pedido/order_del", null, {
      params: { id: id },
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    console.log(response)
    try {
      return { kind: "ok", status: response?.data ?? false }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async setRecieved(id: number): Promise<PostOrderStatus> {
    const response: ApiResponse<any> = await this.client.post("pedido/order_state_recieved", null, {
      params: { id: id },
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    console.log(response)
    try {
      return { kind: "ok", status: response?.data ?? false }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async doRestock(restockIds: number[], orderId: number): Promise<PostOrderStatus> {
    const response: ApiResponse<any> = await this.client.post("/pedido/pending_order", null, {
      params: { prod_ids_restock: restockIds.toString(), id: orderId },
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    console.log(response)
    try {
      return { kind: "ok", status: response?.data ?? false }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getProductInstancesFromOrder(id: number): Promise<GetProductInstances> {
    const response: ApiResponse<
      BackendProductInstance[]
    > = await this.client.get("/pedido/pedidoid_pos", { id: id })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    console.log(response)
    try {
      return { kind: "ok", instances: parseOrderInstances(response.data as BackendOrderInstances) }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async addOrder(order: AddOrderParams): Promise<PostOrder> {
    console.log(order)
    const response: ApiResponse<BackendPostOrderResponse> = await this.client.post(
      "/pedido/order_pos",
      {
        id_producto: order.productIds,
        cantidad: order.ammounts,
        id_cliente: 15,
        direccion: order.address,
        agencia: order.agency,
        tipo: order.type,
        nombre: order.name,
        cod_postal: order.postalCode,
        fecha_Entrega: moment(),
        fecha_Pedido: moment(),
      },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }
    try {
      return {
        kind: "ok",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        order: parseOrder(response!.data![response!.data!.length - 1] as BackendOrder),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        restockId: response!.data![0]
      }
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
    } catch (err) {
      console.log(err)
      return { kind: "bad-data" }
    }
  }
}
