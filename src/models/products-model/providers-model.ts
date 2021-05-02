import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ProvidersModel = types
  .model("ProvidersModel")
  .props({
    id: types.identifierNumber,
    name: "",
  })
  .actions((self) => {
    return {}
  })

type ProvidersModelType = Instance<typeof ProvidersModel>
export interface ProvidersModel extends ProvidersModelType {}
type ProvidersModelSnapshotType = SnapshotOut<typeof ProvidersModel>
export interface ProvidersModelSnapshot extends ProvidersModelSnapshotType {}
