import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/BarnCafeswap/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, LP, LPvalue } from './styles'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const LPValue: React.FunctionComponent<FarmWithStakedValue> = ({ token, quoteToken, lpSymbol, tokenAmount, quoteTokenAmount }) => {
  const tokenAmountBigNumber = new BigNumber(tokenAmount)
  const quoteTokenAmountBigNumber = new BigNumber(quoteTokenAmount)
  let tokenAmounting = null
  let quoteTokenAmounting = null

  if (tokenAmountBigNumber) {
    tokenAmounting = (getBalanceNumber(tokenAmountBigNumber, 0)).toFixed(4)
  }
  if (quoteTokenAmountBigNumber) {
    quoteTokenAmounting = (getBalanceNumber(quoteTokenAmountBigNumber, 0)).toFixed(4)
  }

  const TranslateString = useI18n()

  return (
    <Container>
     <ActionContainer>
        <ActionTitles>
          <Title>{token.symbol} </Title>
          <Subtle>{TranslateString(999, 'in LP')}</Subtle>
        </ActionTitles>
        <ActionContent>
          <div>
            <LP>{tokenAmounting}</LP>
            <LPvalue>{lpSymbol}</LPvalue>
          </div>
        </ActionContent>
     </ActionContainer>

     <ActionContainer>
        <ActionTitles>
          <Title>{quoteToken.symbol} </Title>
          <Subtle>{TranslateString(999, 'in LP')}</Subtle>
        </ActionTitles>
        <ActionContent>
          <div>
            <LP>{quoteTokenAmounting}</LP>
            <LPvalue>{lpSymbol}</LPvalue>
          </div>
        </ActionContent>
     </ActionContainer>
    </Container>
  )
}

export default LPValue
