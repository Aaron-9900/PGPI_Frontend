import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetProducts, PostProduct } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { ProductsModel } from "./products-model"

export type ProductParams = {
  name: string
  quantity: number
  provider?: string
  restockAmmount?: number
}
export const ProductsModelStore = types
  .model("ProductsModelStore")
  .props({
    products: types.map(ProductsModel),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views((self) => {
    return {
      get productsList() {
        return Array.from(self.products.values())
      },
    }
  })
  .actions((self) => {
    return {
      getProducts: flow(function* () {
        self.setStatus("pending")
        try {
          const response: GetProducts = yield self.environment.api.getProducts()
          self.setStatus("idle")
          if (response.kind === "ok") {
            const products = response.product
            products.forEach((product) => self.products.put(product))
          } else {
            throw response
          }
        } catch (err) {
          self.setStatus("error")
          throw err
        }
      }),
      postProduct: flow(function* (product: ProductParams) {
        self.setStatus("pending")
        try {
          const response: PostProduct = yield self.environment.api.addProducts(product)
          self.setStatus("done")
          if (response.kind !== "ok") {
            throw response
          }
          self.products.put(response.product)
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
