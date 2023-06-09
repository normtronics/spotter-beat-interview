import { Input, Col, Textarea, Button, Spacer, Row  } from "@nextui-org/react"
import { FormEvent, useContext, useState } from "react"
import { addBeatToAct, updateBeatInAct } from "../services/sheet-service"
import { BeatSheetDispatchContext } from "./context/beat-sheet-context"


interface NewModalProps {
  actId: number
  close: () => void
}

export const NewModal = ({ close, actId }: NewModalProps) => {
  const dispatch = useContext(BeatSheetDispatchContext)
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [content, setContent] = useState('')
  const [cameraAngle, setCameraAngel] = useState('')
  const [notes, setNotes] = useState('')



  const createNewBeat = async () => {  
    const res = await addBeatToAct(actId, {
      name,
      time,
      content,
      cameraAngle,
      notes,
      id: 0
    })


    if(res && dispatch) {
      dispatch({
        type: 'update_sheet',
        payload: {
          sheet: res
        }
      })

      close()
    }
  }
  
  return (
    <Col>
      <Input
        underlined
        fullWidth
        color="primary"
        size="lg"
        value={name}
        name="name"
        placeholder="name"
        onChange={(newName) => setName(newName.target.value) }
      />
      <Spacer y={2.5} />
      <Input
        underlined
        fullWidth
        color="primary"
        size="lg"
        value={time}
        name="time"
        placeholder="time"
        onChange={(newTime) => setTime(newTime.target.value) }
      />
      <Spacer y={2.5} />
      <Textarea
        underlined
        fullWidth
        color="primary"
        size="lg"
        value={content}
        name="content"
        placeholder="content"
        onChange={(newContent) => setContent(newContent.target.value) }
      />
      <Spacer y={2.5} />
      <Input
        underlined
        fullWidth
        color="primary"
        size="lg"
        value={cameraAngle}
        name="cameraAngle"
        placeholder="cameraAngle"
        onChange={(newCameraAngle) => setCameraAngel(newCameraAngle.target.value) }
      />
      <Spacer y={2.5} />
      <Textarea
        underlined
        fullWidth
        color="primary"
        size="lg"
        value={notes}
        name="notes"
        placeholder="notes"
        onChange={(newNotes) => setNotes(newNotes.target.value) }
      />
      <Spacer y={2.5} />
      <Row justify="flex-end">
        <Button size='sm' onPress={() => createNewBeat()}>Create</Button>
        <Button size='sm' onPress={() => close()} light>Cancel</Button>
      </Row>
      
      <Spacer y={1} />
    </Col>
  )
}