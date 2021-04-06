import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const StyledNewsCard = styled(Card)`
  background-image: url('/images/plant-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
`

const NewsCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledNewsCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'News & Announcement')}
        </Heading>
        <Block>
          <Label>The website is live!</Label>
        </Block>
      </CardBody>
    </StyledNewsCard>
  )
}

export default NewsCard
