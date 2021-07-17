import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Helmet } from "react-helmet"
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, useModal } from '@plantswap-libs/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import usePersistState from 'hooks/usePersistState'
import { useVerticalGardens, useBlock } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import VerticalGardenCard from './components/VerticalGardenCard'
import VerticalGardenTabButtons from './components/VerticalGardenTabButtons'
import Divider from './components/Divider'

import RiskDisclaimer from './components/RiskDisclaimer'

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

 const VerticalGarden: React.FC = () => {
  const { path } = useRouteMatch()
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(false, 'plantswap_verticalgarden_accepted_risk')
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const verticalGardens = useVerticalGardens(account)
  const { currentBlock } = useBlock()
  const [stackedOnly, setStackedOnly] = useState(false)

  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true)
  const [onPresentRiskDisclaimer] = useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false)

  // TODO: memoize modal's handlers
  const onPresentRiskDisclaimerRef = useRef(onPresentRiskDisclaimer)

  useEffect(() => {
    if (!hasAcceptedRisk) {
      onPresentRiskDisclaimerRef.current()
    }
  }, [hasAcceptedRisk, onPresentRiskDisclaimerRef])

  const [finishedVerticalGardens, openVerticalGardens] = useMemo(
    () => partition(verticalGardens, (verticalGarden) => verticalGarden.isFinished || currentBlock > verticalGarden.endBlock),
    [currentBlock, verticalGardens],
  )
  const stackedOnlyVerticalGardens = useMemo(
    () => openVerticalGardens.filter((verticalGarden) => verticalGarden.userData && new BigNumber(verticalGarden.userData.stakedBalance).isGreaterThan(0)),
    [openVerticalGardens],
  )

  return (
    <Page>
      <Helmet>
        <title>PlantSwap.finance - Vertical Garden 🌱</title>
        <meta name="description" content="Stake Token and earn multiple reward tokens in our multiple Vertical Gardens🌱" />
        <meta name="keywords" content="plantswap,defi,vertical garden,plant,cake,eggp,brew,chess,oddz" />
        <meta name="twitter:image" content="https://plantswap.finance/images/verticalGardens.svg" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="Stake Token and earn multiple reward tokens in our multiple Vertical Gardens🌱" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:url" content="https://plantswap.finance/verticalGardens" />
        <meta property="og:image" content="https://plantswap.finance/images/verticalGardens.svg" />
        <meta property="og:description" content="Stake Token and earn multiple reward tokens in our multiple Vertical Gardens🌱" />
      </Helmet>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Vertical Garden')}
          </Heading>
          <ul>
            <li>{TranslateString(580, 'Stake CAKE, LPs or other token and earn PLANT and other Token.')}</li>
            <li>{TranslateString(486, 'You can unstake at any time.')}</li>
            <li>{TranslateString(406, 'Rewards are calculated per block, some of it go')}</li>
            <li>{TranslateString(406, 'toward buying PLANT token on the market and burning them')}</li>
            <li>{TranslateString(406, 'and the remaining go toward the PlantSwap Development Fund')}</li>
          </ul>
        </div>
        <img src="/images/verticalGardens.svg" alt="Vertical Gardens" width={600} height={315} />
      </Hero>
      <VerticalGardenTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {stackedOnly
              ? orderBy(stackedOnlyVerticalGardens, ['sortOrder']).map((verticalGarden) => <VerticalGardenCard key={verticalGarden.vgId} verticalGarden={verticalGarden} />)
              : orderBy(openVerticalGardens, ['sortOrder']).map((verticalGarden) => <VerticalGardenCard key={verticalGarden.vgId} verticalGarden={verticalGarden} />)}
            <Coming />
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedVerticalGardens, ['sortOrder']).map((verticalGarden) => (
            <VerticalGardenCard key={verticalGarden.vgId} verticalGarden={verticalGarden} />
          ))}
        </Route>
      </FlexLayout>
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

export default VerticalGarden
