import { applySnapshot, cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetProductInstances } from "../../services/api-types"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { ProductsModel } from "../products-model/products-model"
export const OrdersModel = types
  .model("OrdersModel")
  .props({
    id: types.identifierNumber,
    productId: 0,
    product: types.maybeNull(types.reference(ProductsModel)),
    address: "",
    orderStatus: "",
    clientId: 0,
  })
  .extend(withEnvironment)
  .extend(withStatus)
// .actions((self) => {})

type OrdersModelType = Instance<typeof OrdersModel>
export interface OrdersModel extends OrdersModelType {}
type OrdersModelSnapshotType = SnapshotOut<typeof OrdersModel>
export interface OrdersModelSnapshot extends OrdersModelSnapshotType {}
