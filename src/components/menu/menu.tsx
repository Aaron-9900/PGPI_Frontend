import React from "react"
import { Button, Menu } from "antd"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { useStores } from "../../models/root-store/root-store-context"
import { observer } from "mobx-react-lite"

const StyledButton = styled(Button)`
  margin-left: auto;
`
type MenuProps = {
  currentIndex: string
}

export const TopMenu = observer(function (props: MenuProps): JSX.Element {
  const { currentIndex } = props
  const history = useHistory()
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[currentIndex]}>
      <Menu.Item
        key="1"
        onClick={() => {
          history.push("/")
        }}
      >
        Stock
      </Menu.Item>
      <Menu.Item key="2" onClick={() => history.push("/pedidos")}>
        Pedidos
      </Menu.Item>
    </Menu>
  )
})
