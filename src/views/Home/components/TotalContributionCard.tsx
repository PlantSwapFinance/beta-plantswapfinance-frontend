import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const StyledTotalContributionCard = styled(Card)`
  background: linear-gradient(#FFB237, #399349);
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalContributionCard = () => {
  const TranslateString = useI18n()
  const rawTctn = 10500
  const tctn = rawTctn.toLocaleString(undefined, {maximumFractionDigits:2})

  return (
    <StyledTotalContributionCard>
      <CardBody>
        <Heading size="lg" color="contrast"  mb="24px">
          {TranslateString(999, 'Total Contribution to nonprofits')}
        </Heading>
        <Heading size="xl" color="contrast" >{tctn}$</Heading>
            <Text color="contrast" >{TranslateString(999, 'New contribution every months')} 🌳🌳🌏🌎🌍</Text>
        
      </CardBody>
    </StyledTotalContributionCard>
  )
}

export default TotalContributionCard
