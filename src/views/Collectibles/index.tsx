import React from 'react'
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import { Image, Heading } from '@plantswap-libs/uikit'
import Page from 'components/layout/Page'
import Divider from './components/Divider'
import NftList from './components/NftList'


const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Collectibles = () => {

  return (
    <Page>
      <Helmet>
        <title>PlantSwap.finance - Gardeners Collectibles 🌱</title>
        <meta name="description" content="Find the different PlantSwap Gardeners Collectibles🌱" />
        <meta name="keywords" content="plantswap,defi,collectibles,nft,nfts" />
        <meta name="twitter:image" content="https://plantswap.finance/images/collectibles.svg" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="Find the different PlantSwap Gardeners Collectibles🌱" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:url" content="https://plantswap.finance/collectibles" />
        <meta property="og:image" content="https://plantswap.finance/images/collectibles.svg" />
        <meta property="og:description" content="Find the different PlantSwap Gardeners Collectibles🌱" />
      </Helmet>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
          Gardeners Collectibles
          </Heading>
          <ul>
            <li>Find the different PlantSwap Gardeners Collectibles</li>
            <li>These collectibles can be minted when creating a profile,</li>
            <li>when participating to some event or smart contract.</li>
          </ul>
        </div>
        <img src="/images/collectibles.svg" alt="Plantswap Gardeners Collectibles" width={400} height={210} />
      </Hero>
      <Divider />
      <NftList /><br />
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

export default Collectibles
