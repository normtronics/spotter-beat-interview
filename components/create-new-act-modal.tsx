import { Button, Col, Input, Row, Spacer } from "@nextui-org/react"
import { useContext, useState } from "react"
import { createAct } from "../services/act-service"
import { addActToSheet } from "../services/sheet-service"
import { BeatSheetDispatchContext } from "./context/beat-sheet-context"

interface NewActModalProps {
  close: () => void
}

export const CreateNewActModal = ({ close }: NewActModalProps) => {
  const dispatch = useContext(BeatSheetDispatchContext)
  const [name, setName] = useState('')

  const createNewAct = async () => {
    const res = await addActToSheet(name)

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

      <Spacer y={1} />
      <Row justify="flex-end">
        <Button size='sm' onPress={() => createNewAct()}>Create</Button>
        <Button size='sm' onPress={() => close()} light>Cancel</Button>
      </Row>
      <Spacer y={1} />
    </Col>
  )
}