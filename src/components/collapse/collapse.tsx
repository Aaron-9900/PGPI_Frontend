import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Collapse } from "antd"
import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export const CollapseItem = (props: Props): JSX.Element => {
  return (
    <Collapse
      defaultActiveKey={["1"]}
      onChange={() => console.log("change")}
      expandIconPosition="right"
      expandIcon={(panelProps) =>
        !panelProps.isActive ? <PlusOutlined /> : <MinusCircleOutlined />
      }
    >
      {props.children}
    </Collapse>
  )
}
