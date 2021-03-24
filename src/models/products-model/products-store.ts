import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PostProduct } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { ProductsModel } from "./products-model"

export type ProductParams = {
  name: string
  quantity: number
  provider?: string
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
        /*
        try {
          self.loading = true
          const response: GetProducts = yield self.environment.api.getProducts(from, to)
          self.loading = false
          if (response.kind === "ok") {
            const Products = response.Products
            applySnapshot(self.products, Products as any)
          } else {
            throw response
          }
        } catch (err) {
          self.loading = false
          throw err
        }
        */
      }),
      postProduct: flow(function* (product: ProductParams) {
        self.setStatus("pending")
        try {
          const response: PostProduct = yield self.environment.api.addProducts(product)
          self.setStatus("done")
          if (response.kind === "ok") {
            const product = response.product
            self.products.push(product as any)
          } else {
            throw response
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
