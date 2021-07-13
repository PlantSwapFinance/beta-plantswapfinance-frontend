import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useTotalValue } from 'state/hooks'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const tvl = useTotalValue().toNumber().toLocaleString(undefined, {maximumFractionDigits:2})

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        <Heading size="xl">{tvl}$</Heading>
            <Text color="textSubtle">{TranslateString(999, 'Across all LPs and Gardens Pools')}</Text>
        
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
