import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { calculateBrewEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpersCafeswap'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  brewPrice?: BigNumber
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
  brewPrice,
  apy,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const oneThousandDollarsWorthOfBrew = 1000 / brewPrice.toNumber()

  const brewEarnedPerThousand1D = calculateBrewEarnedPerThousandDollars({ numberOfDays: 1, cafeswapFarmApy: apy, brewPrice })
  const brewEarnedPerThousand7D = calculateBrewEarnedPerThousandDollars({ numberOfDays: 7, cafeswapFarmApy: apy, brewPrice })
  const brewEarnedPerThousand30D = calculateBrewEarnedPerThousandDollars({ numberOfDays: 30, cafeswapFarmApy: apy, brewPrice })
  const brewEarnedPerThousand365D = calculateBrewEarnedPerThousandDollars({
    numberOfDays: 365,
    cafeswapFarmApy: apy,
    brewPrice,
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
            {TranslateString(864, 'BREW per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: brewEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfBrew })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{brewEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: brewEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfBrew })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{brewEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: brewEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfBrew })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{brewEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: brewEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfBrew })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{brewEarnedPerThousand365D}</Text>
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
