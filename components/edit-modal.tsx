import { Input, Col, Textarea, Button, Spacer, Row  } from "@nextui-org/react"
import { FormEvent, useContext, useState } from "react"
import { BeatModel } from "../services/beat-service"
import { updateBeatInAct } from "../services/sheet-service"
import { BeatSheetDispatchContext } from "./context/beat-sheet-context"


interface EditModalProps {
  beat: BeatModel
  close: () => void
}

export const EditModal = ({ beat, close }: EditModalProps) => {
  const dispatch = useContext(BeatSheetDispatchContext)
  const [name, setName] = useState(beat.name)
  const [time, setTime] = useState(beat.time)
  const [content, setContent] = useState(beat.content)
  const [cameraAngle, setCameraAngel] = useState(beat.cameraAngle)
  const [notes, setNotes] = useState(beat.notes)

  const updateBeat = async () => {
    const res = await updateBeatInAct({
      name,
      time,
      content,
      cameraAngle,
      notes,
      id: beat.id
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
        onChange={(newNotes) => setNotes(newNotes.target.value) }
      />
      <Spacer y={2.5} />
      <Row justify="flex-end">
        <Button size='sm' onPress={() => updateBeat()}>Update</Button>
        <Button size='sm' onPress={() => close()} light>Cancel</Button>
      </Row>
      
      <Spacer y={1} />
    </Col>
  )
}