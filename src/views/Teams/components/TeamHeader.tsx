import React from 'react'
import styled from 'styled-components'
import { Helmet } from "react-helmet"
import { Heading } from '@plantswap-libs/uikit'
import { useProfile } from 'state/hooks'
import HeaderWrapper from 'views/Profile/components/HeaderWrapper'
import NoProfileCard from './NoProfileCard'

const TeamHeader = () => {
  const { isInitialized, profile } = useProfile()
  const showProfileCallout = isInitialized && !profile

  return (
    <>
      {showProfileCallout && <NoProfileCard />}
      <HeaderWrapper>
        
      <Helmet>
        <title>PlantSwap.finance - Team & Profile 🌱</title>
        <meta name="description" content="Find the different PlantSwap Gardeners Collectibles🌱" />
        <meta name="keywords" content="plantswap,defi,collectibles,nft" />
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
          Team & Profile
          </Heading>
          <ul>
            <li>Have a look at the different Gardeners Teams</li>
            <li>Each month we donate fund to ecological fundation with core mission</li>
            <li>in-line with these teams name & descriptions.</li>
          </ul>
        </div>
        <img src="/images/teams.svg" alt="Plantswap Teams" width={400} height={210} />
      </Hero>
      </HeaderWrapper>
    </>
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

export default TeamHeader
