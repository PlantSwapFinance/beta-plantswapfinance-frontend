import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
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

const LPYourPortionValue: React.FunctionComponent<FarmWithStakedValue> = ({ pid, token, quoteToken, tokenAmount, lpTokenBalanceMC, quoteTokenAmount }) => {
  const { stakedBalance } = useFarmUser(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const tokenAmountBigNumber = new BigNumber(tokenAmount)
  const quoteTokenAmountBigNumber = new BigNumber(quoteTokenAmount)
  const lpTokenBalanceMCBigNumber = new BigNumber(lpTokenBalanceMC)
  let tokenAmounting = null
  let quoteTokenAmounting = null
  let lpTokenBalanceMCings = null

  if (lpTokenBalanceMCBigNumber) {
    lpTokenBalanceMCings = getBalanceNumber(lpTokenBalanceMCBigNumber, 18).toFixed(4)
  }

  const mathMultiply = (rawStakedBalance / lpTokenBalanceMCings)
  if (tokenAmountBigNumber) {
    tokenAmounting = (getBalanceNumber(tokenAmountBigNumber.multipliedBy(mathMultiply), 0)).toFixed(4)
  }
  if (quoteTokenAmountBigNumber) {
    quoteTokenAmounting = (getBalanceNumber(quoteTokenAmountBigNumber.multipliedBy(mathMultiply), 0)).toFixed(4)
  }

  const TranslateString = useI18n()

  return (
    <Container>
      <ActionContainer>
          <ActionTitles>
            <Title>Your share of {token.symbol} </Title>
            <Subtle>{TranslateString(999, 'in LP')}</Subtle>
          </ActionTitles>
          <ActionContent>
            <div>
              <LP>{tokenAmounting}</LP>
              <LPvalue>{token.symbol}</LPvalue>
            </div>
          </ActionContent>
      </ActionContainer>

      <ActionContainer>
          <ActionTitles>
            <Title>Your share of {quoteToken.symbol} </Title>
            <Subtle>{TranslateString(999, 'in LP')}</Subtle>
          </ActionTitles>
          <ActionContent>
            <div>
              <LP>{quoteTokenAmounting}</LP>
              <LPvalue>{quoteToken.symbol}</LPvalue>
            </div>
          </ActionContent>
      </ActionContainer>
    </Container>
  )
}

export default LPYourPortionValue
