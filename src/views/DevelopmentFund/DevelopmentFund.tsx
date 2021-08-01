import React from 'react'
import { Helmet } from "react-helmet"
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
      <Helmet>
        <title>PlantSwap.finance - Development Fund 🌱</title>
        <meta name="description" content="Find the details on the PlantSwap Development Fund🌱" />
        <meta name="keywords" content="plantswap,defi,developmentFund" />
        <meta name="twitter:image" content="https://plantswap.finance/images/developmentFund.svg" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="Find the details on the PlantSwap Development Fund🌱" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:url" content="https://plantswap.finance/developmentFund" />
        <meta property="og:image" content="https://plantswap.finance/images/developmentFund.svg" />
        <meta property="og:description" content="Find the details on the PlantSwap Development Fund🌱" />
      </Helmet>
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
      <Heading as="h2" size="xl" mb="14px">Last donations</Heading>
      <Donation>
          <br />
          <ul>
            <li>250$ - Raingorest Foundation (https://etherscan.io/tx/0xdcda28b246ba81a9068a9db599f41bccc90f17b65799eb8c5835b3a8cc631ee0)</li>
            <li>4200$ - Raingorest Foundation (https://etherscan.io/tx/0xdbeac34c17995294466e4248e31db05f646e79980c1ebfad8034a198cd151c79)</li>
            <li>6000$ - Raingorest Foundation (https://etherscan.io/tx/0xd40c9d84e75c3169aeb5cb6831782ed4438216932e172720a54804fbf0f73f9b)</li>
            <li>50$ - Raingorest Foundation (https://etherscan.io/tx/0x967c5ad8c523406f0515dc7a98faaf942946008531c3a066ca9aec6146b3d56f)</li>
          </ul>
          <br />
          <Text>Thank you for your support!</Text>
      </Donation>
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

const Donation = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
`

export default DevelopmentFund
