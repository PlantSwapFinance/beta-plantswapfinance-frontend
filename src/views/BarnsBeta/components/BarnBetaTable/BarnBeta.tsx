import React from 'react'
import styled from 'styled-components'
import { useBarnBetaUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Text, Image } from '@plantswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'

export interface BarnBetaProps {
  label: string
  chefPlatform: string
  pid: number
  image: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const BarnBeta: React.FunctionComponent<BarnBetaProps> = ({ image, label, pid }) => {
  const { stakedBalance } = useBarnBetaUser(pid)
  const TranslateString = useI18n()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderBarnBetaing = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold>
          {TranslateString(999, 'FARMING')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <IconImage src={`/images/barns/${image}.svg`} alt="icon" width={40} height={40} mr="8px" />
      <div>
        {handleRenderBarnBetaing()}
        <Text bold>{label}</Text>
      </div>
    </Container>
  )
}

export default BarnBeta
