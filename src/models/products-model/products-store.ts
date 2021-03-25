import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetProducts, PostProduct } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { ProductsModel } from "./products-model"

export type ProductParams = {
  name: string
  quantity: number
  provider?: string
  reestock?: number
}
export const ProductsModelStore = types
  .model("ProductsModelStore")
  .props({
    products: types.array(ProductsModel),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .actions((self) => {
    return {
      getProducts: flow(function* () {
        self.setStatus("pending")
        try {
          const response: GetProducts = yield self.environment.api.getProducts()
          self.setStatus("done")
          if (response.kind === "ok") {
            const product = response.product
            applySnapshot(self.products, product as any)
          } else {
            throw response
          }
        } catch (err) {
          self.setStatus("error")
          throw err
        }
      }),
      postProduct: flow(function* (product: ProductParams, isNew?: boolean) {
        self.setStatus("pending")
        try {
          const response: PostProduct = yield self.environment.api.addProducts(product)
          self.setStatus("done")
          if (response.kind !== "ok") {
            throw response
          }
          if (isNew) {
            self.products.push(response.product)
          }
        } catch (err) {
          self.setStatus("error")
          throw err
        }
      }),
    }
  })

type ProductsModelStoreType = Instance<typeof ProductsModelStore>
export interface ProductsModelStore extends ProductsModelStoreType {}
type ProductsModelStoreSnapshotType = SnapshotOut<typeof ProductsModelStore>
export interface ProductsModelStoreSnapshot extends ProductsModelStoreSnapshotType {}
