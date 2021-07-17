import React from 'react'
import { Helmet } from "react-helmet"
import Page from 'components/layout/Page'
import { Image, Heading } from '@plantswap-libs/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import Divider from './components/Divider'

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Vote = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Helmet>
        <title>PlantSwap.finance - Governance 🌱</title>
        <meta name="description" content="Hold $PLANT token and vote to decide the future of PlantSwap all together🌱" />
        <meta name="keywords" content="plantswap,defi,governance,plant,vote" />
        <meta name="twitter:image" content="https://plantswap.finance/images/roadmap.svg" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="Hold $PLANT token and vote to decide the future of PlantSwap all together🌱" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:url" content="https://plantswap.finance/vote" />
        <meta property="og:image" content="https://plantswap.finance/images/roadmap.svg" />
        <meta property="og:description" content="Hold $PLANT token and vote to decide the future of PlantSwap all together🌱" />
      </Helmet>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Governance')}
          </Heading>
          <ul>
            <li>{TranslateString(580, 'Vote on proposals to chose the future of PlantSwap')}</li>
            <li>{TranslateString(486, 'when you hold PLANT in your wallet')}</li>
          </ul>
        </div>
        <img src="/images/roadmap.svg" alt="Beta1" width={400} height={210} />
      </Hero>
      <Divider />
          <iframe title="Snapshot Voting" src="https://snapshot.org/#/plantswap.eth" width="100%" height="900px"> </iframe>
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

export default Vote
