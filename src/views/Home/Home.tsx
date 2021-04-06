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
        <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={155} />
    </Page>
  )
}

export default Home
