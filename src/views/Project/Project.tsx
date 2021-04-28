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

const Project = () => {

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
          Project
          </Heading>
          <ul>
            <li>Read the detail of our project and</li>
            <li>The PlantSwap Development Fund</li>
          </ul>
        </div>
        <img src="/images/roadmap.svg" alt="Roadmap" width={400} height={210} />
      </Hero>
      <Divider />
        <Heading as="h2" size="xl" mb="14px">Are you farming on Binance Smart Chain yet?</Heading>
          <br />
          <Text>Did you hear of the success of PancakeSwap, GooseFinance, CafeSwap and many more?</Text>
          <Text>The DeFi space has been growing at a insane speed and if you are seasoned farmer by now, you must be having like us multiple dozen of tabs open on your browser to keep track of your different farms and pools.</Text>
          <Text>Even just keeping track of the price of all of these DeFi project probably give you headache!</Text>
          <Text>This is were PlantSwap come in, we are launching a farming platform that aim at giving you tools to track many metrics across multiple BSC farming project!</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">What DeFi problem are we trying to solve?:</Heading>
          <br />
          <Text>Too many different website and platform to look at to manage your diverse farming investment, we give you the tools to have a quick glance at all your farming operation across multiple other DeFi project on Binance Smart Chain.</Text>
          <Text>Hard to keep track of the price per token of many DeFi project</Text>
          <Text>Extremely hard to know your impermanent gain/loss on Binance Smart Chain</Text>
          <Text>Too many Rugpull with the use of a Migrator contract</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">What will we do about these?:</Heading>
          <br />
          <Text>No migrator contract, no chance of rugpull here!</Text>
          <Text>Detect what other pools and farms you are taking part in and allow you to see your rewards across multiples DeFi projects.</Text>
          <Text>Calculate the profitability per day/month/year of each of your farming strategy and allow you to calculate the profitability at different price valuation.</Text>
          <Text>Allow you to remove spending approval, emergency withdraw and other security function aiming at protecting you from others DeFi project going bad.</Text>
          <Text>Set automatic harvest or compound function on other farms and pool.</Text>
          <br />
        <Heading as="h2" size="xl" mb="14px">🌲The PlantSwap Development Fund will help plant trees and other environmental causes</Heading>
          <br />
          <Text>45%🌲 will go to plant trees 🌲</Text>
          <Text>45%🔥 will be burn to lower the total supply 🔥</Text>
          <Text>10%💸 keep in treasury to cover operating expense 💸</Text>
          <br />
          <Text>A governance token to choose the right organization and causes to support</Text>
          <Text>Later this year, when the community around Plant Swap finance will have grown, we will release a governance token to decentralize the decision making on which causes to support, what goal to focus on and regulate the different economic incentives of this eco-system. More on this later…</Text>
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

export default Project
