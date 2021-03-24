import { Instance, SnapshotOut, types } from "mobx-state-tree"
export const ProductsModel = types
  .model("ProductsModel")
  .props({
    id: types.identifierNumber,
    name: "",
    quantity: 0,
    minRestock: 0,
    provider: "",
  })
  .actions((self) => {
    return {}
  })

type ProductsModelType = Instance<typeof ProductsModel>
export interface ProductsModel extends ProductsModelType {}
type ProductsModelSnapshotType = SnapshotOut<typeof ProductsModel>
export interface ProductsModelSnapshot extends ProductsModelSnapshotType {}
