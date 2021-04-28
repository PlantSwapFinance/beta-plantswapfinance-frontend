import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const StyledQuickDescriptionCard = styled(Card)`
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

const OtherLine = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
  padding-left: 5%;
`

const LabelTelegram = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 18px;
  text-decoration-line: underline;
  padding-left: 5%;
`

const QuickDescriptionCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledQuickDescriptionCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'What is PlantSwap Finance?')}
        </Heading>
        <Block>
          <Label>{TranslateString(544, '- A decentralized open-source financial platform to')}</Label>
          <OtherLine>{TranslateString(544, 'exchange your crypto;')}</OtherLine>
        </Block>
        <Block>
          <Label>{TranslateString(546, '- Manage your yield farming operations;')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(546, '- Have a glance at your impermanent profits/lost;')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(546, '- Interact with various smart contracts and more.')}</Label>
        </Block>
        <br /><br />
        <Block>
          <Label>{TranslateString(546, 'If this is something that interests you,')}</Label>
        </Block>
        <Block>
            <LabelTelegram><a href="https://t.me/plantswapfinance">Contact us on our Telegram!</a></LabelTelegram>
        </Block>
      </CardBody>
    </StyledQuickDescriptionCard>
  )
}

export default QuickDescriptionCard
