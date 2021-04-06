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

const Roadmap = () => {

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            Roadmap
          </Heading>
          <ul>
            <li>Read our roudmap to discovert what is next</li>
            <li>for the future of PlantSwap.finance and the PLANT token!</li>
          </ul>
        </div>
        <img src="/images/roadmap.svg" alt="Roadmap" width={400} height={210} />
      </Hero>
      <Divider />
        <Heading as="h2" size="xl" mb="14px">1. Finish the basic</Heading>
          <br />
          <Text>1.1 Finish User Interface (UI)</Text>
          <Text>1.2 Finish tokenomic</Text>
          <Text>1.3 Finish the exchange and liquidity</Text>
          <Text>1.4 Finish the farms and garden</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">2. Testing phase</Heading>
          <br />
          <Text>2.1 Deploy Smart Contract in test local-network</Text>
          <Text>2.2 Test website and smart-contract interaction localy  <u>&lt;- We are here</u></Text>
          <Text>2.3 Deploy Smart Contract in test-network</Text>
          <Text>2.4 Test all page and function</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">3. Let&apos;s go live!</Heading>
          <br />
          <Text>3.1 Deploy website and Smart Contract on BSC main net</Text>
          <Text>3.2 Organize token distribution</Text>
          <Text>3.3 Deploy some liquidity</Text>
          <Text>3.4 Attract investors</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">4. Get serious</Heading>
          <br />
          <Text>4.1 Get listed on CMC and CoinGecko</Text>
          <Text>4.2 Find other farms parteners</Text>
          <Text>4.3 Get listed on other exchanges</Text>
        <br /><br />
        <Heading as="h2" size="xl" mb="14px">Others project</Heading>
          <br />
          <Text> + Release of the Barn, a great tool to manage your farming at large.</Text>
        <br /><br />
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

export default Roadmap
