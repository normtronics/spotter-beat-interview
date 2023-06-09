'use client'

import { SheetModel } from "../services/sheet-service"
import { Col, Text } from "@nextui-org/react"

interface OutlineProps {
  sheet: SheetModel
}

export const Outline = ({ sheet }: OutlineProps) => {
  return (
    <Col>
      <Text b size={20}>
        Outline
      </Text>
      <ul>
        {(sheet && sheet.acts) ? sheet.acts.map( (item, index ) => (
          <li  key={item.act.id}>
            <Text b>
              {item.act.name}
            </Text>
            <ul>
              {item.beats?.map((beats) => (
                <li key={beats.id}>
                  <Text size={12}>
                    {`${beats.name} @ ${beats.time}`}
                  </Text>
                </li>
              ))}
            </ul>
          </li>
        )) : null}
      </ul>
    </Col>
  )
}