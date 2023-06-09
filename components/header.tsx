import { Button, Navbar, Spacer, Text, Col, Row } from "@nextui-org/react"
import { useContext, useState } from "react"
import { BeatSheetContext } from "./context/beat-sheet-context"
import { CreateNewActModal } from "./create-new-act-modal"
import { FullSheet } from "./full-sheet"
import { ModalContainer } from "./modal"

export const Header = () => {
  const state = useContext(BeatSheetContext);
  const [isOpen, setOpen] = useState(false)
  const [openFullSheet, setOpenFullSheet] = useState(false)

  return (
    <>
      <Spacer y={3} />
      <Navbar isBordered>
        <Navbar.Brand>
          <Col>
            <Text b h1 color="inherit" css={{
              m: 0,
              p: 0
            }}>
              BEAT SHEET
            </Text>
            <Row justify='space-between'>
              <Button size='sm' onPress={() => setOpen(true)}>
                Create new act
              </Button>
                <Button size='sm' light onClick={() => setOpenFullSheet(true)}>
                View Full Sheet
              </Button>
            </Row>
            <Spacer y={3} />
          </Col>
        </Navbar.Brand>
      </Navbar>
      <ModalContainer isOpen={isOpen} closeHandler={() => setOpen(false)} title='New Beat'>
        <CreateNewActModal  close={() => setOpen(false)}/>
      </ModalContainer>

      {state?.sheet ? <ModalContainer fullScreen isOpen={openFullSheet} closeHandler={() => setOpenFullSheet(false)} title='Full Sheet'>
        <FullSheet  sheet={state.sheet}/>
      </ModalContainer> : null }
    </>
  )
}