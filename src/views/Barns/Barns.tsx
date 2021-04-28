import React from 'react'
import { Image, Heading, Text } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import styled  from 'styled-components'
import Page from 'components/layout/Page'
import Divider from './components/Divider'

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Barns: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Barn')}
          </Heading>
          <ul>
            <li><Text>Manage all your farming operation</Text></li>
            <li><Text>Add liquidity, see stats, harverst or remove your LP&apos;s</Text></li>
            <li><Text>Everything under one barn.</Text></li>
          </ul>
        </div>
        <img src="/images/barns.svg" alt="Barns" width={600} height={315} />
      </Hero>
      <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Currently in development')}
          </Heading>
      <Divider />
        <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={315} />
      </Page>
    </>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Barns
