import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Flex, MetamaskIcon } from '@plantswap-libs/uikit'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag, PancakeSwapTag, GooseFinanceTag } from 'components/Tags'
import { useBlock } from 'state/hooks'
import { VerticalGardenCategory } from 'config/constants/types'
import { registerToken } from 'utils/wallet'
import { BASE_URL } from 'config'

const tags = {
  [VerticalGardenCategory.BINANCE]: BinanceTag,
  [VerticalGardenCategory.CORE]: CoreTag,
  [VerticalGardenCategory.COMMUNITY]: CommunityTag,
  [VerticalGardenCategory.PANCAKE]: PancakeSwapTag,
  [VerticalGardenCategory.GOOSE]: GooseFinanceTag,
}

interface Props {
  projectLink: string
  decimals: number
  totalStaked: BigNumber
  totalStakedBusd: BigNumber
  harvestedReward: BigNumber
  harvestedPlant: BigNumber
  tokenStakedName: string
  tokenRewardName: string
  tokenStakedAddress: string
  tokenStakedRewardName: string
  tokenStakedRewardAddress: string
  tokenEarnName: string
  tokenEarnAddress: string
  tokenDecimals: number
  startBlock: number
  endBlock: number
  isFinished: boolean
  verticalGardenCategory: VerticalGardenCategory
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#399349' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled(Flex)`
  align-items: center;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`

const LabelRight = styled.div`
font-size: 14px;
font-weight: bold;
color: ${(props) => props.theme.colors.text};
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  decimals,
  totalStaked,
  totalStakedBusd,
  harvestedReward,
  harvestedPlant,
  tokenStakedName,
  tokenRewardName,
  tokenStakedAddress,
  tokenStakedRewardName,
  tokenStakedRewardAddress,
  tokenEarnName,
  tokenEarnAddress,
  tokenDecimals,
  isFinished,
  startBlock,
  endBlock,
  verticalGardenCategory,
}) => {
  const { currentBlock } = useBlock()
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[verticalGardenCategory]

  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)

  const imageSrc = `${BASE_URL}/images/tokens/${tokenStakedRewardName.toLowerCase()}.png`

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <FlexFull>
          <Tag />
        </FlexFull>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Details>
          <Row mb="4px">
            <FlexFull>
              <Label>
                {TranslateString(408, 'Total Stacked')} {tokenStakedName}
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStaked, decimals)} />
          </Row>
          <Row mb="4px">
            <FlexFull>
              <Label>
                {TranslateString(408, 'Total Stacked in BUSD')}
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStakedBusd, decimals)} decimals={2} />
            &nbsp;
            <LabelRight> {TranslateString(1212, 'BUSD')}</LabelRight>
          </Row>
          {blocksUntilStart > 0 && (
            <Row mb="4px">
              <FlexFull>
                <Label>{TranslateString(1212, 'Start')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Row>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Row mb="4px">
              <FlexFull>
                <Label>{TranslateString(410, 'End')}:</Label>
              </FlexFull>
              <Balance fontSize="14px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Row>
          )}
          <Row mb="4px">
            <FlexFull>
              <Label>
              🌱
              </Label>
            </FlexFull>
          </Row>
          {harvestedPlant.toNumber() > 0 && (
          <Row mb="4px">
            <FlexFull>
              <Label>
                {TranslateString(408, 'You previouslsy harvested')}
              </Label>
            </FlexFull>
          </Row>
          )}
          {harvestedPlant.toNumber() > 0 && (
          <Row mb="4px">
            <FlexFull>
              &nbsp;
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(harvestedPlant, decimals)} decimals={6} />
            &nbsp;
            <LabelRight> {tokenEarnName}</LabelRight>
          </Row>
          )}
          {harvestedReward.toNumber() > 0 && (
          <Row mb="4px">
            <FlexFull>
              &nbsp;
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(harvestedReward, decimals)} decimals={6} />
            &nbsp;
            <LabelRight> {tokenRewardName}</LabelRight>
          </Row>
          )}
          {tokenStakedAddress && (
            <Flex mb="4px">
              <TokenLink onClick={() => registerToken(tokenStakedAddress, tokenStakedName, tokenDecimals, imageSrc)}>
                Add {tokenStakedName} to Metamask
              </TokenLink>
              <MetamaskIcon height={15} width={15} ml="4px" />
            </Flex>
          )}
          {tokenStakedRewardAddress && tokenStakedRewardAddress !== tokenStakedAddress && (
            <Flex mb="4px">
              <TokenLink onClick={() => registerToken(tokenStakedRewardAddress, tokenStakedRewardName, tokenDecimals, imageSrc)}>
                Add {tokenStakedRewardName} to Metamask
              </TokenLink>
              <MetamaskIcon height={15} width={15} ml="4px" />
            </Flex>
          )}
          {tokenEarnAddress && (
            <Flex mb="4px">
              <TokenLink onClick={() => registerToken(tokenEarnAddress, tokenEarnName, tokenDecimals, imageSrc)}>
                Add {tokenEarnName} to Metamask
              </TokenLink>
              <MetamaskIcon height={15} width={15} ml="4px" />
            </Flex>
          )}
          <TokenLink href={projectLink} target="_blank">
            View {tokenRewardName} project site
          </TokenLink>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
