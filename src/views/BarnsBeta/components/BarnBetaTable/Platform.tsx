import React from 'react'
import styled from 'styled-components'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { Text, Image } from '@plantswap-libs/uikit'

export interface PlatformProps {
  value: string
  image: string
  platformAddress?: Address
  platformPrice?: BigNumber
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
  padding-left: 6px;
  display: flex;
  margin-left: 6px;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`

const WrapIcon = styled.div`
  padding-left: 6px;
  display: flex;
  margin-left: 6px;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`

const PlatformWrapper = styled.div`
  min-width: 60px;
  text-align: center;
`

const Platform: React.FC<PlatformProps> = ({
  value,
  image,
}) => {
  const TranslateString = useI18n()

  return  (
    <Container>
      {value ? (
        <>
          <PlatformWrapper>
           <WrapIcon>
             <IconImage src={`/images/platforms/${image}.svg`} alt="icon" width={32} height={32} mr="8px" />
             <Text bold>{value}</Text>
            </WrapIcon>
          </PlatformWrapper>
        </>
      ) : (
        <PlatformWrapper>{TranslateString(656, 'Loading...')}</PlatformWrapper>
      )}
    </Container>
  )
}

export default Platform
