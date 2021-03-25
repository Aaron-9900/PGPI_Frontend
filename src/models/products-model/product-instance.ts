import { Instance, SnapshotOut, types } from "mobx-state-tree"
export const ProductInstance = types
  .model("ProductInstance")
  .props({
    id: types.identifierNumber,
    row: 0,
    col: 0,
    type: types.union(types.literal("Preparacion"), types.literal("Stock")),
  })
  .actions((self) => {
    return {}
  })

type ProductInstanceType = Instance<typeof ProductInstance>
export interface ProductInstance extends ProductInstanceType {}
type ProductInstanceSnapshotType = SnapshotOut<typeof ProductInstance>
export interface ProductInstanceSnapshot extends ProductInstanceSnapshotType {}
