import React from 'react'
import styled from 'styled-components'
import { Heading } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const Wrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 24px;
`

const Header: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Heading as="h1" size="xxl" color="secondary" mb="8px">
        {TranslateString(770, 'Profile Setup')}
      </Heading>
      <Heading as="h2" size="lg" mb="8px">
        {TranslateString(772, 'Build yourself a unique profile')}
      </Heading>
      <Heading as="h1" size="xxl" color="secondary" mb="8px">
          In progress...
      </Heading>
    </Wrapper>
  )
}

export default Header
