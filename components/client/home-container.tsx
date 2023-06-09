'use client'

import { Collapse, Grid, Row, Text, Button, Spacer} from "@nextui-org/react"
import { deleteActFromSheet, SheetModel } from "../../services/sheet-service"
import { BeatCard } from "../beat-card"
import { Outline } from "../outline"
import { CssBaseline } from '@nextui-org/react';
import Head from "next/head"
import { useContext, useState } from "react"
import { BeatSheetContext, BeatSheetDispatchContext } from "../context/beat-sheet-context"
import { ModalContainer } from "../modal"
import { NewModal } from "../create-new-beat"



export const HomeContainer = () => {
  const state = useContext(BeatSheetContext);
  const dispatch = useContext(BeatSheetDispatchContext)
  const [isOpen, setOpen] = useState(false)
  const [actId, setActId] = useState<number>(0)

  const removeAct = async (actId: number) => {
    const res = await deleteActFromSheet(actId)

    if(res && dispatch) {
      dispatch({
        type: 'update_sheet',
        payload: {
          sheet: res
        }
      })

      setOpen(false)
    }
  }

  if(!state?.sheet) {
    return <></>
  }

  return (
   <>
    <Head>
      {CssBaseline.flush()}
    </Head>
    <Grid.Container 
      gap={1} 
      justify="center"
    >
      <Grid 
        xs={0} 
        sm={2}
      >
          {state?.sheet ? <Outline sheet={state?.sheet} /> : null }
      </Grid>
      <Grid 
        xs={12} 
        sm={10}
      >
        <Collapse.Group 
          css={{
            width: '100%'
          }}
        >
          {(state?.sheet && state?.sheet.acts) ? state?.sheet.acts.map( (item, index ) => (
            <>
              <Collapse 
                title={
                  <CollapseTitle 
                    title={item.act.name} 
                    remove={() => removeAct(item.act.id)} 
                    open={() => {
                      setOpen(true)
                      setActId(item.act.id)
                    }}
                  />
                } 
                subtitle={`Total beats: ${item.beats?.length}`} 
                key={`${item.act.id}`}
              >
                <Row 
                  gap={2} 
                  css={{
                    overflow: 'scroll',
                    margin: 0
                  }}
                >
                  {item.beats ? item.beats.map((beat, i) => (
                    <Grid 
                      xs={12} 
                      sm={4} 
                      key={beat.id} 
                      css={{
                        pl:0
                      }}
                    >
                      <BeatCard 
                        beat={beat} 
                        actId={item.act.id}
                      />
                    </Grid>
                  )): null}
                </Row>
              </Collapse>
            </>
          )) : null }
        </Collapse.Group>
      </Grid>
    </Grid.Container>
    <ModalContainer 
      isOpen={isOpen} 
      closeHandler={() => setOpen(false)} 
      title='New Beat'
    >
      <NewModal 
        actId={actId} close={() => setOpen(false)}
      />
    </ModalContainer>
  </>
  )
}

interface CollapseTitleProps {
  title: string
  open: () => void,
  remove: () => void 
}

const CollapseTitle = ({ title, open, remove }: CollapseTitleProps) => {
  return (
    <Grid.Container 
      gap={1}
    >
       <Grid 
        xs={4} 
        sm={2} 
        css={{
          p:0
        }}
       >
        <Text 
          size={24}
        >
          {title}
        </Text>
       </Grid>
       <Grid 
        xs={4} 
        sm={1} 
        justify='center' 
        alignItems='center'
      >
        <Button 
          size='xs' 
          onPress={() => open()}
        >
          Create Beat
        </Button>
       </Grid>
       <Grid 
        xs={4} 
        sm={1} 
        justify='center' 
        alignItems='center'
      >
        <Button 
          color='error' 
          size='xs' 
          onPress={() => remove()}
        >
          Delete Act
        </Button>
       </Grid>
    </Grid.Container>
  )
}