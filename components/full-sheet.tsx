import { Col, Spacer, Text } from "@nextui-org/react"
import { SheetModel } from "../services/sheet-service"

interface FullSheetProps {
  sheet: SheetModel
}

export const FullSheet = ({ sheet }: FullSheetProps) => {
  return (
    <Col>
      <ul>
        {(sheet && sheet.acts) ? sheet.acts.map( (item, index ) => (
          <li  key={item.act.id}>
            <Text b h2>
              {item.act.name}
            </Text>
            <ul>
              {item.beats?.map((beats) => (
                <li key={beats.id} style={{
                  borderBottom: '1px solid #ffffff'
                }}>
                  <Text b css={{
                    textDecoration: 'underline'
                  }}>
                    Name
                  </Text>
                  <Text size={16}>
                    {beats.name}
                  </Text>
                  <Spacer y={1} />
                  <Text b css={{
                    textDecoration: 'underline'
                  }}>
                    Time
                  </Text>
                  <Text size={16}>
                    {beats.time}
                  </Text>
                  <Spacer y={1} />
                  <Text b css={{
                    textDecoration: 'underline'
                  }}>
                    Camera Angle
                  </Text>
                  <Text size={16}>
                    {beats.cameraAngle}
                  </Text>
                  <Spacer y={1} />
                  <Text b css={{
                    textDecoration: 'underline'
                  }}>
                    Content
                  </Text>
                  <Text size={16}>
                    {beats.content}
                  </Text>
                  <Spacer y={1} />
                  <Text b css={{
                    textDecoration: 'underline'
                  }}>
                    Notes
                  </Text>
                  <Text size={16}>
                    {beats.notes}
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