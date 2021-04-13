import React, { useContext } from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@plantswap-libs/uikit'
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
        {TranslateString(772, 'Show off your stats and collectibles with your unique profile')}
      </Heading>
      <Text color="textSubtle" mb="24px">
        {TranslateString(999, 'Total cost: 0.15 PLANT')}
      </Text>
      <Heading as="h1" size="xxl" color="secondary" mb="8px">
          In progress...
      </Heading>
    </Wrapper>
  )
}

export default Header
