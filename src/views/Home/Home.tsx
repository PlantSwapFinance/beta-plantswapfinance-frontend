import React from 'react'
import styled from 'styled-components'
import { Image, Heading, Text, BaseLayout } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import QuickDescriptionCard from 'views/Home/components/QuickDescriptionCard'
import NewsCard from 'views/Home/components/NewsCard'
import Divider from './components/Divider'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/pan-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    background-position: left, right;
    height: 512px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'PlantSwap.finance')}
        </Heading>
        <Text>{TranslateString(578, 'Swap and Farm $PLANT with others and')}</Text>
        <Text>{TranslateString(578, 'with our smart contracts on Binance Smart Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          <QuickDescriptionCard />
          <NewsCard />
        </Cards>
      </div>
      <Divider />
      <Heading as="h2" size="xl" mb="14px">🌲The PlantSwap Development Fund will help plant trees and other environmental causes</Heading>
          <br />
          <Text>Some pools will have deposit fees as well as some of the transaction with the Master Gardener smart contract result in PLANT been send to the Development Fund address. What will we do with the fund?</Text>
          <br />
          <Text>45%🌲 will go to plant trees 🌲</Text>
          <Text>45%🔥 will be burn to lower the total supply 🔥</Text>
          <Text>10%💸 keep in treasury to cover operating expanse 💸</Text>
          <br />
          <Text>A governance token to chose the right organization and causes to support</Text>
          <Text>Later this year, when the community around Plant Swap finance will have grown, we will release a governance token to decentralize the decision making on which causes to support, what goal to focus on and regulate the different economic incentives of this eco-system. More on this later…</Text>
        <br /><br />
        <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={155} />
    </Page>
  )
}

export default Home
