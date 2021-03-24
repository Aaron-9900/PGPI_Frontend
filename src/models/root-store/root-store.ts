import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthModel } from "../auth-model/auth-model"
import { ProductsModelStore } from "../products-model/products-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthModel, {}),
  productsStore: types.optional(ProductsModelStore, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
