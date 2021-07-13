import React from 'react'
import { Card, CardBody, Heading, Text } from '@plantswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricePlantBusd } from 'state/hooks'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPlantAddress } from 'utils/addressHelpers'
import Plant from 'components/PLANT'
import CardValue from './CardValue'

const StyledPlantStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const PlantStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getPlantAddress()))
  const plantSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const plantPrice = usePricePlantBusd().toNumber()
  const mathMarketCap = ((getBalanceNumber(totalSupply) - burnedBalance) * plantPrice)
  const totalMarketCap = totalSupply ? mathMarketCap  : 0

  return (
    <StyledPlantStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'PLANT Stats')}
        </Heading>
        <Row>
          <Text fontSize="16px">{TranslateString(536, 'Total PLANT Supply')}</Text>
          {plantSupply && <CardValue fontSize="16px" value={plantSupply} />}🌱
        </Row>
        <Row>
          <Text fontSize="16px">{TranslateString(538, 'Total PLANT Burned')}</Text>
          <CardValue fontSize="16px" decimals={3} value={burnedBalance} />🔥
        </Row>
        <Row>
          <Text fontSize="16px">{TranslateString(540, 'New PLANT/block')}</Text>
          <CardValue fontSize="16px" decimals={3} value={0.02} />⛏🧱
        </Row>
        <Row>
          <Text fontSize="16px">{TranslateString(538, 'Contribution to nonprofits')}</Text>
          <CardValue fontSize="16px" decimals={2} value={10250} />$
        </Row>
        <Row>
          <Plant />
        </Row>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Market cap. & Price')}
        </Heading>
        <Row>
          <Text fontSize="16px">{TranslateString(536, 'Current Market Cap.')}</Text>
          {totalMarketCap && <CardValue fontSize="16px" value={totalMarketCap} />}$
        </Row>
        <Row>
          <Text fontSize="16px">{TranslateString(538, 'PLANT price in BUSD')}</Text>
          <CardValue fontSize="16px" decimals={2} value={plantPrice} />$
        </Row>
      </CardBody>
    </StyledPlantStats>
  )
}

export default PlantStats
