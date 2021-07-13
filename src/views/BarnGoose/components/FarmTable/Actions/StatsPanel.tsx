import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal } from '@plantswap-libs/uikit'
import { FarmWithStakedValue } from 'views/BarnGoose/components/FarmCard/FarmCard'
import { ActionContent } from './styles'
import LPTotalSupply from './LPTotalSupply'

export interface StatsPanelProps {
  details: FarmWithStakedValue
}

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

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const StatsPanel: React.FunctionComponent<StatsPanelProps> = ({ details }) => {
  const farm = details
  const { account } = useWeb3React()

  const TranslateString = useI18n()
  const { token } = farm
  const projectTokenLabel = farm.token.symbol
  const projectLinkLabel = farm.token.projectLink
  const projectLinkLink = farm.token.projectLink
  const projectTokenAddress = token.address[56]
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const thisIsAToken = farm.isTokenOnly
  const bscLpUrl = `https://bscscan.com/token/${lpAddress}`
  const bscTokenUrl = `https://bscscan.com/token/${projectTokenAddress}`
  const pcsInfoLpUrl = `https://pancakeswap.info/pair/${lpAddress}`
  const pcsInfoTokenUrl = `https://pancakeswap.info/token/${projectTokenAddress}`

  const yourBscInfoLpUrl = `https://bscscan.com/token/${lpAddress}?a=${account}`
  const yourBscInfoTokenUrl = `https://bscscan.com/token/${projectTokenAddress}?a=${account}`

  const pcsBuySellTokenUrl = `https://exchange.pancakeswap.finance/#/swap?inputCurrency=BNB&outputCurrency=${projectTokenAddress}`

  let lpOrToken = 'LP Token'
  if(thisIsAToken === true) { lpOrToken = 'Token' }

  let lpOrTokenLinkBSCScan = <StyledLinkExternal href={bscLpUrl}>{TranslateString(999, `View ${lpOrToken} Token Contract`)}</StyledLinkExternal>
  if(thisIsAToken === true) { lpOrTokenLinkBSCScan = <StyledLinkExternal href={bscTokenUrl}>{TranslateString(999, `View ${projectTokenLabel} ${lpOrToken} Contract`)}</StyledLinkExternal> }
  
  let lpOrTokenLinkInfo = <StyledLinkExternal href={pcsInfoLpUrl}>{TranslateString(999, `View ${lpOrToken} informations`)}</StyledLinkExternal>
  if(thisIsAToken === true) { lpOrTokenLinkInfo = <StyledLinkExternal href={pcsInfoTokenUrl}>{TranslateString(999, `View ${projectTokenLabel} Token informations`)}</StyledLinkExternal> }
 
  let yourLpOrTokenLinkInfo = <StyledLinkExternal href={yourBscInfoLpUrl}>{TranslateString(999, `🔥View your ${lpOrToken} tx.`)}</StyledLinkExternal>
  if(thisIsAToken === true) { yourLpOrTokenLinkInfo = <StyledLinkExternal href={yourBscInfoTokenUrl}>{TranslateString(999, `🔥View your ${projectTokenLabel} Token tx.`)}</StyledLinkExternal> }

  let lpOrTokenLinkBuy = null
  if(thisIsAToken === true) { lpOrTokenLinkBuy = <StyledLinkExternal href={pcsBuySellTokenUrl}>{TranslateString(999, `Buy/Sell ${projectTokenLabel}`)}</StyledLinkExternal> }

  return (
    <Container>
      <InfoContainer>
        <StakeContainer>
          <StyledLinkExternal href={`${projectLinkLink}`}>
            {TranslateString(999, `Go to ${projectLinkLabel}`, { name: projectLinkLabel })}
          </StyledLinkExternal>
        </StakeContainer>
        {lpOrTokenLinkBSCScan}
        {lpOrTokenLinkInfo}
        {lpOrTokenLinkBuy}
        <br />
        {yourLpOrTokenLinkInfo}
      </InfoContainer>
      <ActionContainer>
        <ActionContent>
          <LPTotalSupply {...farm} />
        </ActionContent>
      </ActionContainer>
    </Container>
  )
}

export default StatsPanel
