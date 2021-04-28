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

const DevelopmentFund = () => {

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
          Development Fund
          </Heading>
          <ul>
            <li>Find the details on the PlantSwap Development Fund</li>
            <li>The contribution to non-profits and proof of burn</li>
          </ul>
        </div>
        <img src="/images/developmentFund.svg" alt="DevelopmentFund" width={400} height={210} />
      </Hero>
      <Divider />
        <Heading as="h2" size="xl" mb="14px">Current non-profits selected by the Development Fund</Heading>
          <br />
          <Heading as="h1" size="xxl" mb="16px">The Rainforest foundation</Heading>
          <Text>The Rainforest Foundation Fund is a charitable foundation founded in 1987 and dedicated to drawing attention to rainforests and defending the rights of indigenous peoples living there.</Text>
          <br />
          <br />
        <Heading as="h2" size="xl" mb="14px">The frequency of the donnation and blockchain proof</Heading>
          <br />
          <Text>We are planning the first donation on the first week of May and we will increase the frequency as the ammount increase and we find more foundation to distribure these donations.</Text>
          <br />
          <br />
        <Heading as="h2" size="xl" mb="14px">🌲The PlantSwap Development Fund will help plant trees and other environmental causes</Heading>
          <br />
          <Text>45%🌲 will go to plant trees 🌲</Text>
          <Text>45%🔥 will be burn to lower the total supply 🔥</Text>
          <Text>10%💸 keep in treasury to cover operating expense 💸</Text>
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

export default DevelopmentFund
