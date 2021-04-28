import React from 'react'
import Page from 'components/layout/Page'
import { Image, Heading, Text } from '@plantswap-libs/uikit'
import styled from 'styled-components'
import Divider from './components/Divider'

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Tree = () => {

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
          Tree Token
          </Heading>
          <ul>
            <li>Decentralize gouvernance for the</li>
            <li>PlantSwap Development Fund</li>
          </ul>
        </div>
        <img src="/images/tree.svg" alt="TreeToken" width={250} height={250} />
      </Hero>
      <Divider />
        <Heading as="h2" size="xl" mb="14px">Why holding the Tree token?</Heading>
          <br />
          <Text>-Vote on the allocation in donation to each organisme</Text>
          <Text>-Suggest new new non profits and allocation</Text>
          <Text>-Vote on tokenomic of the platform, futur farms and pools</Text>
          <Text>-Vote on the development priority</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">A decentralized autonomous foundation, this is our goal!</Heading>
          <br />
          <Text>A word of caution, this entire platform is a real world experiment, this project is in current development (dev in prod), invest at your own risk.</Text>
          <Text>If you want to contribute one way or a other to this project, please contact us on Telegram or Twitter.</Text>
          <Text>Let&apos;s make the world a better place all together.</Text>
        <br />
      <Divider />
      <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={155} />
    </Page>
  )
}


const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Tree
