import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Flex, MetamaskIcon, HelpIcon } from '@plantswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag, PancakeSwapTag, CafeswapTag, GooseFinanceTag } from 'components/Tags'
import { useBlock } from 'state/hooks'
import { useVerticalGardenUpdate } from 'hooks/useUpdate'
import { VerticalGardenCategory } from 'config/constants/types'
import { registerToken } from 'utils/wallet'
import { BASE_URL } from 'config'
import HarvestButton from '../../VerticalGarden/components/HarvestButton'
import Tooltip from '../../VerticalGarden/components/Tooltip'

const tags = {
  [VerticalGardenCategory.BINANCE]: BinanceTag,
  [VerticalGardenCategory.CORE]: CoreTag,
  [VerticalGardenCategory.COMMUNITY]: CommunityTag,
  [VerticalGardenCategory.CAFE]: CafeswapTag,
  [VerticalGardenCategory.PANCAKE]: PancakeSwapTag,
  [VerticalGardenCategory.GOOSE]: GooseFinanceTag,
}

interface Props {
  vgId: number
  projectLink: string
  decimals: number
  totalStaked: BigNumber
  totalStakedBusd: BigNumber
  harvest: boolean
  harvestedReward: BigNumber
  harvestedPlant: BigNumber
  compoundedReward: BigNumber
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
  stakedTokenPrice: number
  verticalGardenMasterGardenerAllocPt: number
  verticalGardenCategory: VerticalGardenCategory
  stakedBalance: BigNumber
  stakedBalanceBusd: BigNumber
  stakingTokenDecimals: number
  depositFee: number
  rewardCut: number
  lastUpdate: number
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
  height: 24px;
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
  margin-top: 12px;
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
  vgId,
  projectLink,
  decimals,
  totalStaked,
  totalStakedBusd,
  harvest,
  harvestedReward,
  harvestedPlant,
  compoundedReward,
  tokenStakedName,
  tokenRewardName,
  tokenStakedAddress,
  tokenStakedRewardName,
  tokenStakedRewardAddress,
  tokenEarnName,
  tokenEarnAddress,
  tokenDecimals,
  isFinished,
  stakedTokenPrice,
  verticalGardenMasterGardenerAllocPt,
  startBlock,
  endBlock,
  verticalGardenCategory,
  stakedBalance,
  stakedBalanceBusd,
  stakingTokenDecimals,
  depositFee,
  rewardCut,
  lastUpdate,
}) => {
  const { currentBlock } = useBlock()
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const { account } = useWeb3React()
  const { onUpdate } = useVerticalGardenUpdate(vgId)
  const [pendingTx, setPendingTx] = useState(false)

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
                {TranslateString(408, 'Total Stacked in ')} {tokenStakedName}
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStaked, decimals)} />
            &nbsp;
            <LabelRight> {tokenStakedName}</LabelRight>
          </Row>
          {stakedTokenPrice > 0 && (
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
          )}

        <StyledDetails>
          <FlexFull>{TranslateString(384, 'Your Stake')}:</FlexFull>
          <Balance
            fontSize="14px"
            decimals={6}
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalance, stakingTokenDecimals)}
          />
          &nbsp;
          <LabelRight> {tokenStakedName}</LabelRight>
        </StyledDetails>
        {stakedTokenPrice > 0 && (
        <StyledDetails>
          <FlexFull>{TranslateString(384, 'Your Stake in BUSD')}:</FlexFull>
          <Balance
            fontSize="14px"
            decimals={2}
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalanceBusd, stakingTokenDecimals)}
          />
          &nbsp;
          <LabelRight> {TranslateString(1212, 'BUSD')}</LabelRight>
        </StyledDetails>
        )}
        <StyledDetails>
          <div>{TranslateString(384, 'Deposit fee')}:</div>
          <Balance
            fontSize="14px"
            decimals={2}
            isDisabled={isFinished}
            value={depositFee / 100}
            unit="%"
          />
        </StyledDetails>
        <StyledDetails>
          <div>
            <Tooltip
              content={
                <div>{TranslateString(999, 'The reward cut is already factor in the apy and pending reward.')}
                  <br />
                  <br />{TranslateString(999, 'Usage of the reward cut')}
                  <br />
                  <br />{TranslateString(999, '50% is use to buy PLANT token and burn them')}
                  <br />{TranslateString(999, '50% is send to the Development Fund to help ecological non profit')}
                </div>
              }
            > {TranslateString(384, 'Reward cut ')} ({tokenRewardName} only) <HelpIcon color="textSubtle" />:
            </Tooltip>
          </div>
          <Balance
            fontSize="14px"
            decimals={2}
            isDisabled={isFinished}
            value={rewardCut / 100}
            unit="%"
          />
        </StyledDetails>
        <StyledDetails>
          <FlexFull>{TranslateString(384, 'Block count since last update')}:</FlexFull>
          <Balance
            fontSize="14px"
            decimals={0}
            isDisabled={isFinished}
            value={lastUpdate}
          />
          &nbsp;
          <LabelRight> {TranslateString(1212, 'blocks')}</LabelRight>
        </StyledDetails>
          <StyledDetails>
          <div style={{ flex: 1 }}>
            <Tooltip
              content={
                <div>{TranslateString(999, 'Updating the contract will claim the pending reward for the contract and make them available for distribution.')}
                  <br />{TranslateString(999, 'The total token earn is counting only token reward that has already been claim.')}
                  <br />
                  <br />{TranslateString(999, 'Deposit, Withdraw, Harvest and Compound trigger automatically the update.')}
                  <br />
                  <br />{TranslateString(999, 'If you experience issue at sending tx. trigger the update, then try again.')}
                </div>
              }
            > {TranslateString(999, 'Update the pending reward')} <HelpIcon color="textSubtle" />:
            </Tooltip>
          </div>
          {account && harvest && (
            <HarvestButton
              disabled={pendingTx}
              text={pendingTx ? TranslateString(999, 'Updating') : TranslateString(704, 'Update reward')}
              onClick={async () => {
                setPendingTx(true)
                await onUpdate()
                setPendingTx(false)
              }}
            />
            )}
          </StyledDetails>

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
          {compoundedReward.toNumber() > 0 && (
          <Row mb="4px">
            <FlexFull>
              <Label>
                {TranslateString(408, 'You previously compounded')}
              </Label>
            </FlexFull>
          </Row>
          )}
          {compoundedReward.toNumber() > 0 && (
          <Row mb="4px">
            <FlexFull>
              &nbsp;
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(compoundedReward, decimals)} decimals={6} />
            &nbsp;
            <LabelRight> {tokenRewardName}</LabelRight>
          </Row>
          )}
          {(harvestedPlant.toNumber() > 0 || harvestedReward.toNumber() > 0) && (
          <Row mb="4px">
            <FlexFull>
              <Label>
                {TranslateString(408, 'You previously harvested')}
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
          {tokenEarnAddress && verticalGardenMasterGardenerAllocPt > 0 && (
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

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

export default React.memo(CardFooter)
