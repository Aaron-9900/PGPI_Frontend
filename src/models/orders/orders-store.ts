import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetOrders, PostOrder, PostProduct } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { OrdersModel } from "./orders-model"

export interface AddOrderParams {
  productIds: string
  address: string
  ammounts: string
  name: string
  agency: "SEUR" | "DHL" | "Correos"
  type: "Estándar" | "Urgente"
  postalCode: number
}

export const OrdersModelStore = types
  .model("OrdersModelStore")
  .props({
    orders: types.map(OrdersModel),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views((self) => {
    return {
      get storeAsList() {
        return Array.from(self.orders.values())
      },
    }
  })
  .actions((self) => {
    return {
      getOrders: flow(function* () {
        self.setStatus("pending")
        try {
          const response: GetOrders = yield self.environment.api.getOrders()
          self.setStatus("done")
          if (response.kind === "ok") {
            const orders = response.orders
            console.log(orders)
            self.orders.clear()
            orders.forEach((product) => self.orders.put(product))
          } else {
            throw response
          }
        } catch (err) {
          self.setStatus("error")
          throw err
        }
      }),
      postOrder: flow(function* (order: AddOrderParams) {
        self.setStatus("pending")
        try {
          const response: PostOrder = yield self.environment.api.addOrder(order)
          self.setStatus("done")
          if (response.kind !== "ok") {
            throw response
          }
          self.orders.put(response.order)
          if(response.restockId instanceof Array && typeof response.restockId[0] === "number") {
            return response.restockId
          } else {
            return null
          }
        } catch (err) {
          self.setStatus("error")
          throw err
        }
      }),
    }
  })

type OrdersModelStoreType = Instance<typeof OrdersModelStore>
export interface OrdersModelStore extends OrdersModelStoreType {}
type OrdersModelStoreSnapshotType = SnapshotOut<typeof OrdersModelStore>
export interface OrdersModelStoreSnapshot extends OrdersModelStoreSnapshotType {}
