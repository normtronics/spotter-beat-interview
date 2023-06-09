'use client'

import { Container, createTheme, CssBaseline, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { Header } from './header'
import { BeatSheetContext, BeatSheetDispatchContext, BeatSheetReducer, initialSheet } from './context/beat-sheet-context'
import { useEffect, useReducer } from 'react'
import { getSheet, SheetModel } from '../services/sheet-service'


const lightTheme = createTheme({
  type: 'light',
  theme: {}
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {}
})


export const Wrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(BeatSheetReducer, initialSheet);
  
  useEffect(() => {
    getSheet().then(sheet => {
      console.log('use', sheet)
      if(sheet) {
        dispatch({
          type: 'update_sheet',
          payload: {
            sheet
          }
        })
      }
    })
  }, [])


  if(!state.sheet) {
    return <></>
  }



  return (
    <BeatSheetContext.Provider value={state}>
      <BeatSheetDispatchContext.Provider value={dispatch}>
        <NextThemesProvider
          defaultTheme="dark"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className
          }}
        >
          <NextUIProvider>
            <AnimatePresence mode="wait" initial={false}>
              <Container css={{ p: 0}}>
                <Header />
                {children}
              </Container>
            </AnimatePresence>
          </NextUIProvider>
        </NextThemesProvider>
      </BeatSheetDispatchContext.Provider>
    </BeatSheetContext.Provider>
  )
}