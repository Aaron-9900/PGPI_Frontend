import { applySnapshot, cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetProductInstances, PostProduct } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { ProductInstance } from "./product-instance"
export const ProductsModel = types
  .model("ProductsModel")
  .props({
    id: types.identifierNumber,
    name: "",
    quantity: 0,
    minRestock: 0,
    provider: "",
    stock: 0,
    preparation: 0,
    restock: false,
    instances: types.array(ProductInstance),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .actions((self) => {
    return {
      setRestock: function (val: boolean) {
        self.restock = val
      },
      doRestock: flow(function* () {
        self.status = "pending"
        try {
          const response: PostProduct = yield self.environment.api.postRestock(self.id.toString())
          if (response.kind !== "ok") {
            throw response
          }
          self.status = "done"
          applySnapshot(self, response.product)
        } catch (err) {
          self.status = "error"
          console.error(err)
        }
      }),
      getInstances: flow(function* () {
        self.setStatus("pending")
        try {
          const response: GetProductInstances = yield self.environment.api.getProductInstances(
            self.id,
          )
          if (response.kind !== "ok") {
            throw response
          }
          applySnapshot(self.instances, response.instances as any)
          self.setStatus("done")
        } catch (err) {
          self.setStatus("error")
        }
      }),
      changeProvider: flow(function* (provider: string) {
        try {
          const response: GetProductInstances = yield self.environment.api.changeProvider(
            self.id,
            provider,
          )
          if (response.kind !== "ok") {
            throw response
          }
          self.provider = provider
          self.setStatus("done")
        } catch (err) {
          self.setStatus("error")
        }
      }),
    }
  })

type ProductsModelType = Instance<typeof ProductsModel>
export interface ProductsModel extends ProductsModelType {}
type ProductsModelSnapshotType = SnapshotOut<typeof ProductsModel>
export interface ProductsModelSnapshot extends ProductsModelSnapshotType {}
