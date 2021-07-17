import React, { useState } from 'react'
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import { Image, Heading, Text, useModal, BaseLayout } from '@plantswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import PlantStats from 'views/Home/components/PlantStats'
import QuickDescriptionCard from 'views/Home/components/QuickDescriptionCard'
import NewsCard from 'views/Home/components/NewsCard'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import TotalContributionCard from 'views/Home/components/TotalContributionCard'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import NewVerticalGardens from './components/NewVerticalGardens'
import BuyButton from './components/BuyButton'
import BuyModal from './components/BuyModal'
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
  text-align: center;
    background-image: url('/images/homePlantswapBarnAndFieldLeft.svg'), url('/images/homePlantswapBarnAndFieldRight.svg');
    background-position: left, right;
    height: 260px;
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
  const { account } = useWeb3React()
  const [pendingTx] = useState(false)
  const TranslateString = useI18n()

  const PlantName = 'PLANT'

  const [onPresentBuyModal] = useModal(
    <BuyModal
      tokenName={PlantName}
    />,
  )

  /*  To finish and add
  
        <BuyBtn>
          <BuySellButton width="100%" />
        </BuyBtn>
  */
  return (
    <Page>
      <Helmet>
        <title>PlantSwap.finance 🌱</title>
        <meta name="description" content="Stake and Farm $PLANT token in our farms and gardens.🌱" />
        <meta name="keywords" content="plantswap,defi,plant" />
        <meta name="twitter:image" content="https://plantswap.finance/images/pan-bg-mobile.svg" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="Stake and Farm $PLANT token in our farms and gardens.🌱" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:url" content="https://plantswap.finance/" />
        <meta property="og:image" content="https://plantswap.finance/images/pan-bg-mobile.svg" />
        <meta property="og:description" content="Stake and Farm $PLANT token in our farms and gardens.🌱" />
      </Helmet>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'PlantSwap.finance')}
        </Heading>
        <Text>{TranslateString(578, 'Stake and Farm $PLANT token')}</Text>
        <Text>{TranslateString(578, 'in our farms and gardens.')}</Text>
        <br />
        <Text>A portion of the reward and collected fees</Text>
        <Text>will be used to support ecological nonprofits.</Text>
        <br />
        {account && (
          <BuyButton
            disabled={!account || pendingTx}
            text={TranslateString(704, 'Buy $PLANT')}
            onClick={onPresentBuyModal}
          />
        )}
      </Hero>
      <NewVerticalGardens />
      <div>
        <Cards>
          <FarmStakingCard />
          <NewsCard />
        </Cards>
        <Cards>
          <TotalContributionCard />
          <TotalValueLockedCard />
        </Cards>
        <Cards>
          <QuickDescriptionCard />
          <PlantStats />
        </Cards>
      </div>
      <Divider />
      <Heading as="h2" size="xl" mb="16px">🌲The PlantSwap Development Fund will help plant trees and other environmental causes</Heading>
          <br />
          <Text>Some pools will have deposit fees as well as some of the transactions with the Master Gardener smart contract results in PLANT being created and sent to the Development Fund address. What will we do with the fund?</Text>
          <br />
          <Text>45%🌲 will go to plant trees 🌲</Text>
          <Text>45%🔥 will be burned to lower the total supply 🔥</Text>
          <Text>10%💸 will be kept in treasury to cover operating expenses 💸</Text>
          <br />
          <Text>A governance token to choose the right organizations and causes to support</Text>
          <Text>Later this year, when the community around Plant Swap finance will have grown, we will release a governance token to decentralize the decision making on which causes to support, what goals to focus on and regulate the different economic incentives of this eco-system. More on this later…</Text>
        <br /><br />
        <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={155} />
    </Page>
  )
}

export default Home
