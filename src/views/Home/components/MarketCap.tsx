import React from 'react'
import { Card, CardBody, Heading, Text } from '@plantswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { usePricePlantBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { getPlantAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledMarketCap = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const MarketCap = () => {
  const TranslateString = useI18n()
  const plantPrice = usePricePlantBusd().toNumber()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getPlantAddress()))
  const mathMarketCap = ((getBalanceNumber(totalSupply) - burnedBalance) * plantPrice)
  const totalMarketCap = totalSupply ? mathMarketCap  : 0

  return (
    <StyledMarketCap>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Market cap. & Price')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Current Market Cap.')}</Text>
          {totalMarketCap && <CardValue fontSize="14px" value={totalMarketCap} />}$
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'PLANT price in BUSD')}</Text>
          <CardValue fontSize="14px" decimals={2} value={plantPrice} />$
        </Row>
      </CardBody>
    </StyledMarketCap>
  )
}

export default MarketCap