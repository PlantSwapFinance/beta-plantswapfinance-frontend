import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@plantswap-libs/uikit'
import { communityBarnsBeta } from 'config/constants'
import { BarnBeta } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface BarnBetaWithStakedValue extends BarnBeta {
  apy?: number
  liquidity?: BigNumber
  platform?: string
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface BarnBetaCardProps {
  barnBeta: BarnBetaWithStakedValue
  removed: boolean
  plantPrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const BarnBetaCard: React.FC<BarnBetaCardProps> = ({ barnBeta, removed, plantPrice, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityBarnBeta = communityBarnsBeta.includes(barnBeta.token.symbol)
  // We assume the token name is coin pair + lp e.g. PLANT-BNB LP, LINK-BNB LP,
  // NAR-PLANT LP. The images should be plant-bnb.svg, link-bnb.svg, nar-plant.svg
  const platformImage = barnBeta.chefTag.split(' ')[0].toLocaleLowerCase()
  const barnBetaImage = barnBeta.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const totalValueFormated = barnBeta.liquidity
    ? `$${barnBeta.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = barnBeta.lpSymbol && barnBeta.lpSymbol.toUpperCase().replace('PLANT', 'PLANT')
  const earnLabel = barnBeta.dual ? barnBeta.dual.earnLabel : 'PLANT'

  const barnBetaAPY = barnBeta.apy && barnBeta.apy.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: barnBeta.quoteToken.address,
    tokenAddress: barnBeta.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <FCard>
      {barnBeta.token.symbol === 'PLANT' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={barnBeta.multiplier}
        isCommunityBarnBeta={isCommunityBarnBeta}
        platform={barnBeta.chefTag}
        platformImage={platformImage}
        barnBetaImage={barnBetaImage}
        tokenSymbol={barnBeta.token.symbol}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{TranslateString(736, 'APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {barnBeta.apy ? (
              <>
                <ApyButton lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} plantPrice={plantPrice} apy={barnBeta.apy} />
                {barnBetaAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{TranslateString(318, 'Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <CardActionsContainer barnBeta={barnBeta} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={`https://bscscan.com/address/${barnBeta.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`}
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default BarnBetaCard
