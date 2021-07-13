import React from 'react'
import { Image, Heading } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import styled  from 'styled-components'
import Page from 'components/layout/Page'
import TheBarn from 'components/TheBarn'

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
        <Heading as="h1" size="xxl" mb="16px">
          {TranslateString(738, 'The Barn')}</Heading>
      </Hero>
      <TheBarn />
      <Heading as="h1" size="xl" mb="14px">
            {TranslateString(738, 'View your farming abroad, select a platform ')}
      </Heading>
      <a href="/barnPlantswap">
        <img src="/images/platforms/plantswap.svg" alt="PlantSwap" width={128} height={128} style={{paddingRight: '36px'}} /></a>
      <a href="/barnPancakeswap">
        <img src="/images/platforms/pancakeswap.svg" alt="PancakeSwap" width={128} height={128} style={{paddingRight: '36px'}} /></a>
      <a href="/barnGoose">
        <img src="/images/platforms/goose.png" alt="GooseFinance" width={112} height={128} style={{paddingRight: '36px'}} /></a>
      <a href="/barncafeswap">
        <img src="/images/platforms/cafeswap.png" alt="CafeSwap" width={128} height={128} style={{paddingRight: '36px'}} /></a>
      <br />
        <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={155} />
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
