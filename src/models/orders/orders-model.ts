import { applySnapshot, cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetProductInstances, PostOrderStatus } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { ProductInstance } from "../products-model/product-instance"
import { ProductsModel } from "../products-model/products-model"
export const OrdersModel = types
  .model("OrdersModel")
  .props({
    id: types.identifierNumber,
    productId: 0,
    product: types.array(types.reference(ProductsModel)),
    ammount: types.array(types.number),
    address: "",
    orderStatus: "",
    clientId: 0,
    agency: "",
    type: "",
    name: "",
    postalCode: 0,
    weight: 0,
    createdDate: types.Date,
    deliveryDate: types.maybeNull(types.Date),
    instances: types.array(ProductInstance),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .actions((self) => {
    return {
      getInstances: flow(function* () {
        self.setStatus("pending")
        try {
          const response: GetProductInstances = yield self.environment.api.getProductInstancesFromOrder(
            self.id,
          )
          if (response.kind !== "ok") {
            throw response
          }
          applySnapshot(self.instances, response.instances as any)
          self.setStatus("done")
        } catch (err) {
          console.log(err)
          self.setStatus("error")
        }
      }),
      setOrderStatus: flow(function* (orderStatus: string) {
        self.setStatus("pending")
        try {
          let response: PostOrderStatus
          switch (orderStatus) {
            case "En camino":
              response = yield self.environment.api.setRecieved(self.id)
              if (response.kind !== "ok" || !response.status) {
                throw response
              }
              self.orderStatus = "Recibido"
              break
            case "Pendiente":
              response = yield self.environment.api.doRestock(
                self.product.map((product) => product.id),
                self.id,
              )
              if (response.kind !== "ok" || !response.status) {
                throw response
              }
              self.orderStatus = "Preparación"
              break
            case "Preparación":
              response = yield self.environment.api.setToOnItsWay(self.id)
              if (response.kind !== "ok" || !response.status) {
                throw response
              }
              self.orderStatus = "En camino"
              break
            case "Recibido":
              break
            default:
              throw new Error("PANIC")
          }
          self.setStatus("done")
        } catch (err) {
          console.log(err)
          self.setStatus("error")
        }
      }),
    }
  })

type OrdersModelType = Instance<typeof OrdersModel>
export interface OrdersModel extends OrdersModelType {}
type OrdersModelSnapshotType = SnapshotOut<typeof OrdersModel>
export interface OrdersModelSnapshot extends OrdersModelSnapshotType {}
