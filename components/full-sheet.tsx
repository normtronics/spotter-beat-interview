import { Col, Spacer, Text } from "@nextui-org/react"
import { SheetModel } from "../services/sheet-service"

interface FullSheetProps {
  sheet: SheetModel
}

const textStyles = {
  textDecoration: 'underline'
}

const containerStyles = {
  borderBottom: '1px solid #ffffff'
}

export const FullSheet = ({ sheet }: FullSheetProps) => {
  return (
    <Col>
      <div>
        {(sheet && sheet.acts) ? sheet.acts.map( (item, index ) => (
          <div  key={item.act.id}>
            <Text b h2>
              {item.act.name}
            </Text>
            <div>
              {item.beats?.map((beats) => (
                <div 
                  key={beats.id} 
                  style={containerStyles}
                >
                  <Spacer y={1} />
                  <Text b i size={18} css={textStyles}>
                    Name
                  </Text>
                  <Text size={16}>
                    {beats.name}
                  </Text>
                  <Spacer y={1} />
                  <Text b i size={18} css={textStyles}>
                    Time
                  </Text>
                  <Text size={16}>
                    {beats.time}
                  </Text>
                  <Spacer y={1} />
                  <Text b i size={18} css={textStyles}>
                    Camera Angle
                  </Text>
                  <Text size={16}>
                    {beats.cameraAngle}
                  </Text>
                  <Spacer y={1} />
                  <Text b i size={18} css={textStyles}>
                    Content
                  </Text>
                  <Text size={16}>
                    {beats.content}
                  </Text>
                  <Spacer y={1} />
                  <Text b i size={18} css={textStyles}>
                    Notes
                  </Text>
                  <Text size={16}>
                    {beats.notes}
                  </Text>
                  <Spacer y={1} />
                </div>
              ))}
            </div>
          </div>
        )) : null}
      </div>
    </Col>
  )
}