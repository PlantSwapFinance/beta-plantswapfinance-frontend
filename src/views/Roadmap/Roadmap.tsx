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
        <Heading as="h2" size="xl" mb="14px">Short-term Roadmap</Heading>
          <br />
          <Text>Announce of the Presale details (10 April 2021)</Text>
          <Text>Fair Presale of the $PLANT token on Bounce (12 to 19 April 2021)</Text>
          <Text>Add initial liquidity for PLANT/BNB (75% of Presale BNB profits) (21 April 2021)</Text>
          <Text>Launch the initial PLANT/BNB and PLANT/BUSD farm and the PLANT garden (21 April 2021)</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">Long-term Roadmap</Heading>
          <br />
          <Text>Development of the barn to see all your farming across multiple DeFi platform (Q2 2021)</Text>
          <Text>Adding control and emergency tools to the barn to control, remove your spending approval and emergency withdraw from other smart contracts (Q2 2021)</Text>
          <Text>Partnering with other project for multiple cross-project pool and garden (Q2 2021)</Text>
          <Text>Addition of multiple liquidity pool with stable coin and other wrapped token</Text>
          <Text>Creation and distribution of a governance token</Text>
          <Text>Smart Contract Audit (Q3 2021)</Text>
          <Text>Cross-chain compatibility (Q3 2021)</Text>
          <Text>Much more</Text>
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
