'use client'

import { Button, Card, Col, Popover, Row, Spacer, Text } from "@nextui-org/react"
import { useContext, useState } from "react"
import { BeatModel } from "../services/beat-service"
import { removeBeatFromAct } from "../services/sheet-service"
import { BeatSheetDispatchContext } from "./context/beat-sheet-context"
import { DeleteBeat } from "./delete-beat"
import { EditModal } from "./edit-modal"
import { ModalContainer } from "./modal"

interface BeatCardProps {
  beat: BeatModel,
  actId: number
}

export const BeatCard = ({ beat, actId }: BeatCardProps) => {
  const [isOpen, setOpen] = useState(false)
  const [fullDetails, openFullDetails] = useState(false)
  const dispatch = useContext(BeatSheetDispatchContext)

  const deleteBeat = async () => {
    const res = await removeBeatFromAct(actId, beat.id)
    if(res && dispatch) {
      dispatch({
        type: 'update_sheet',
        payload: {
          sheet: res
        }
      })
    }
  }
  
  return (
    <>
      <Card css={{ width: 500, height: '300px', padding:16 }}>
        <Card.Header>
          <Row justify='space-between'>
            <Text b>{beat.name} @ {beat.time}</Text>
            <Button size='xs' color='secondary' onPress={() => openFullDetails(true)}>
              Full Details
            </Button>
          </Row>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>
          {beat.content}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button size="sm" light onPress={() => setOpen(true)}>
              Edit
            </Button>
            <Popover>
              <Popover.Trigger>
                <Button size="sm" color='error' >Delete</Button>
              </Popover.Trigger>
              <Popover.Content>
                <DeleteBeat deleteFn={deleteBeat} />
              </Popover.Content>
            </Popover>
          </Row>
        </Card.Footer>
      </Card>
      <ModalContainer isOpen={isOpen} closeHandler={() => setOpen(false)} title='Edit Beat'>
        <EditModal beat={beat} close={() => setOpen(false)}/>
      </ModalContainer>
      <ModalContainer isOpen={fullDetails} closeHandler={() => openFullDetails(false)} title='Beat Details'>
        <Col>
          <Text b css={{
            textDecoration: 'underline'
          }}>
            Name
          </Text>
          <Text>
            {beat.name}
          </Text>
          <Spacer y={1} />
          <Text b css={{
            textDecoration: 'underline'
          }}>
            Content
          </Text>
          <Text>
            {beat.content}
          </Text>
          <Spacer y={1} />
          <Text b css={{
            textDecoration: 'underline'
          }}>
            Notes
          </Text>
          <Text>
            {beat.notes}
          </Text>
          <Spacer y={1} />
          <Text b css={{
            textDecoration: 'underline'
          }}> 
            Time
          </Text>
          <Text>
            {beat.time}
          </Text>
          <Spacer y={1} />
          <Text b css={{
            textDecoration: 'underline'
          }}>
            Camera Angle
          </Text>
          <Text>
            {beat.cameraAngle}
          </Text>
          <Spacer y={1} />
        </Col>
      </ModalContainer>
    </>
  )
}