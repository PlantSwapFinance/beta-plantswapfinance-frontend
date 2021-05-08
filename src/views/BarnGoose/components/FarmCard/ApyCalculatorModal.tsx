import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { calculateEggEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpersGoose'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  eggPrice?: BigNumber
  apy?: number
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  eggPrice,
  apy,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const oneThousandDollarsWorthOfEgg = 1000 / eggPrice.toNumber()

  const eggEarnedPerThousand1D = calculateEggEarnedPerThousandDollars({ numberOfDays: 1, gooseFarmApy: apy, eggPrice })
  const eggEarnedPerThousand7D = calculateEggEarnedPerThousandDollars({ numberOfDays: 7, gooseFarmApy: apy, eggPrice })
  const eggEarnedPerThousand30D = calculateEggEarnedPerThousandDollars({ numberOfDays: 30, gooseFarmApy: apy, eggPrice })
  const eggEarnedPerThousand365D = calculateEggEarnedPerThousandDollars({
    numberOfDays: 365,
    gooseFarmApy: apy,
    eggPrice,
  })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(860, 'Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(858, 'ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(864, 'EGG per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: eggEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfEgg })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{eggEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: eggEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfEgg })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{eggEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: eggEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfEgg })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{eggEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: eggEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfEgg })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{eggEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(
          866,
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>
          {TranslateString(999, 'Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
