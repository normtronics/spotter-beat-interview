import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { getSheet } from '../../services/sheet-service'
import { HomeContainer } from '../../components/client/home-container'
import { Suspense } from 'react'
import { NextPageContext } from 'next'

// Home.getInitialProps = async (ctx: NextPageContext) => {
//   const initialProps: any = await Home.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     styles: React.Children.toArray([initialProps.styles])
//   };
// }
 

export default async function Home() {

  return (
    <Wrapper>
      <main>
        <HomeContainer /> 
      </main>
    </Wrapper>
  )
}
