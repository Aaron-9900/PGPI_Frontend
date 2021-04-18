import { observer } from "mobx-react-lite"
import React, { useState, useEffect } from "react"
import { RootStore } from "./models/root-store/root-store"
import { RootStoreProvider } from "./models/root-store/root-store-context"
import { setupRootStore } from "./models/root-store/setup-root-store"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Spin } from "antd"
import { Home, Register, Login, Pedidos } from "./screens"
import { ProductDetal } from "./screens/product-detail-screen"

const App = observer(function App() {
  const [rootStore, setRootStore] = useState<RootStore | null>(null)
  useEffect(() => {
    async function setup() {
      setupRootStore().then(setRootStore)
    }
    setup()
  }, [])
  if (!rootStore) return null
  return (
    <RootStoreProvider value={rootStore}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/pedidos">
              <Pedidos />
            </Route>
            <Route path="/order/:productId">
              <ProductDetal />
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/product/:productId">
              <ProductDetal />
            </Route>
          </Switch>
        </Router>
      </div>
    </RootStoreProvider>
  )
})

export default App
