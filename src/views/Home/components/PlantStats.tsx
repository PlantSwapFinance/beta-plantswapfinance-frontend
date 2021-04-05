import React from 'react'
import { Card, CardBody, Heading, Text } from '@plantswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledPlantStats = styled(Card)`
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

const PlantStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const plantSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledPlantStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Plant Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total PLANT Supply')}</Text>
          {plantSupply && <CardValue fontSize="14px" value={plantSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total PLANT Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New PLANT/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={25} />
        </Row>
      </CardBody>
    </StyledPlantStats>
  )
}

export default PlantStats
