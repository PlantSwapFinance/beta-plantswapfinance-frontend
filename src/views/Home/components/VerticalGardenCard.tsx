import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Flex, Button, IconButton, useModal, AddIcon, Image, Text, HelpIcon } from '@plantswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useVerticalGardenApprove, useVerticalGardenApproveReward, useVerticalGardenApprovePlantReward } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useVerticalGardenStake } from 'hooks/useStake'
import { useVerticalGardensUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { useVerticalGardenHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { VerticalGarden } from 'state/types'
import { useBlock, usePricePlantBusd, usePriceCakeBusd, usePriceBrewBusd, usePriceOddzBusd, usePriceChessBusd } from 'state/hooks'
import DepositModal from '../../VerticalGarden/components/DepositModal'
import WithdrawModal from '../../VerticalGarden/components/WithdrawModal'
import CompoundModal from '../../VerticalGarden/components/CompoundModal'
import CardTitle from '../../VerticalGarden/components/CardTitle'
import Card from '../../VerticalGarden/components/Card'
import HarvestButton from '../../VerticalGarden/components/HarvestButton'
import CardFooter from './VerticalGardenCardFooter'
import Tooltip from '../../VerticalGarden/components/Tooltip'

interface HarvestProps {
  verticalGarden: VerticalGarden
}

const VerticalGardenCard: React.FC<HarvestProps> = ({ verticalGarden }) => {
  const {
    vgId,
    stakingToken,
    stakingRewardToken,
    verticalEarningToken,
    harvest,
    verticalGardenCategory,
    totalStaked,
    lastRewardUpdateBlock,
    lastRewardUpdateBlockPrevious,
    lastRewardUpdateTotalStakedToken,
    lastRewardUpdateRewardTokenGained,
    lastRewardUpdatePlantGained,
    startBlock,
    endBlock,
    verticalGardenMasterGardenerAllocPt,
    isFinished,
    depositFee,
    rewardCut,
    userData,
    stakingLimit,
  } = verticalGarden

  const TranslateString = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const stakingRewardTokenContract = useERC20(stakingRewardToken.address ? getAddress(stakingRewardToken.address) : '')
  const verticalEarningTokenContract = useERC20(verticalEarningToken.address ? getAddress(verticalEarningToken.address) : '')
  const { account } = useWeb3React()
  const { onApprove } = useVerticalGardenApprove(stakingTokenContract, vgId)
  const { onApproveReward } = useVerticalGardenApproveReward(stakingRewardTokenContract, vgId)
  const { onApprovePlantReward } = useVerticalGardenApprovePlantReward(verticalEarningTokenContract, vgId)
  const { onStake } = useVerticalGardenStake(vgId)
  const { onUnstake } = useVerticalGardensUnstake(vgId)
  const { onReward } = useVerticalGardenHarvest(vgId)

  const Icon = isOpen ? ChevronUp : ChevronDown
  const handleClick = () => setIsOpen(!isOpen)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  
  const plantPrice = usePricePlantBusd()
  const cakePrice = usePriceCakeBusd()
  const brewPrice = usePriceBrewBusd()
  const oddzPrice = usePriceOddzBusd();
  const chessPrice = usePriceChessBusd();

  let stakedTokenPrice
  if(stakingToken.symbol === 'CAKE') {
    stakedTokenPrice = cakePrice
  }
  if(stakingToken.symbol === 'BREW') {
    stakedTokenPrice = brewPrice
  }
  if(stakingToken.symbol === 'ODDZ') {
    stakedTokenPrice = oddzPrice
  }
  if(stakingToken.symbol === 'CHESS') {
    stakedTokenPrice = chessPrice
  }

  const totalStakedBusd = new BigNumber(stakedTokenPrice).multipliedBy(totalStaked)

  const allowance = new BigNumber(userData?.allowance || 0)
  const allowanceReward = new BigNumber(userData?.allowanceReward || 0)
  const allowancePlant = new BigNumber(userData?.allowancePlant || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const stakedBalanceBusd = new BigNumber(stakedBalance).multipliedBy(new BigNumber(stakedTokenPrice)) // Need improvement for flexibility
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const earningsPlant = new BigNumber(userData?.pendingPlantReward || 0)

  const compoundedReward = new BigNumber(userData?.compoundedReward || 0)
  const harvestedReward = new BigNumber(userData?.harvestedReward || 0)
  const harvestedPlant = new BigNumber(userData?.harvestedPlant || 0)

  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber()
  const needsApprovalReward = !allowanceReward.toNumber()
  const needsApprovalPlantReward = !allowancePlant.toNumber()
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(verticalEarningToken.decimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingToken.symbol} (${stakingLimit} max)` : stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingToken.symbol} />,
  )
  const verticalGardenMainImage = `${getAddress(verticalGarden.stakingToken.address)}.svg`.toLocaleLowerCase()
  const verticalGardenSmallImageOne = `${getAddress(verticalGarden.stakingRewardToken.address)}.svg`.toLocaleLowerCase()
  const verticalGardenSmallImageTwo = `${getAddress(verticalGarden.verticalEarningToken.address)}.svg`.toLocaleLowerCase()
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )
  const apyBlockCount = new BigNumber(lastRewardUpdateBlock).minus(lastRewardUpdateBlockPrevious)
  let rewardTokenApy = new BigNumber(0)
  if(verticalGarden.stakingRewardToken === verticalGarden.stakingToken) {
    rewardTokenApy = new BigNumber(lastRewardUpdateRewardTokenGained)
                                        .div(apyBlockCount)
                                        .multipliedBy(new BigNumber(10512000))
                                        .div(lastRewardUpdateTotalStakedToken)
                                        .multipliedBy(new BigNumber(100))
  }
  if(verticalGarden.stakingRewardToken.symbol === 'ODDZ') {
    rewardTokenApy = new BigNumber(lastRewardUpdateRewardTokenGained)
                                        .div(apyBlockCount)
                                        .multipliedBy(new BigNumber(10512000))
                                        .div(lastRewardUpdateTotalStakedToken)
                                        .div(new BigNumber(cakePrice).div(new BigNumber(oddzPrice)))
                                        .multipliedBy(new BigNumber(100))
  }
  if(verticalGarden.stakingRewardToken.symbol === 'CHESS') {
    rewardTokenApy = new BigNumber(lastRewardUpdateRewardTokenGained)
                                        .div(apyBlockCount)
                                        .multipliedBy(new BigNumber(10512000))
                                        .div(lastRewardUpdateTotalStakedToken)
                                        .div(new BigNumber(cakePrice).div(new BigNumber(chessPrice)))
                                        .multipliedBy(new BigNumber(100))
  }

  let earningDecimal = 7
  if(earnings > new BigNumber(1000000000000)) {
    earningDecimal = 4
  }
  let earningPlantDecimal = 9
  if(earningsPlant > new BigNumber(1000000000000)) {
    earningPlantDecimal = 5
  }

  const { currentBlock } = useBlock()

  const lastRewardUpdateBlockToNumber = new BigNumber(lastRewardUpdateBlock).toNumber()

  const lastUpdate = currentBlock - lastRewardUpdateBlockToNumber

  const plantTokenApy = new BigNumber(lastRewardUpdatePlantGained)
                                        .div(apyBlockCount)
                                        .multipliedBy(new BigNumber(10512000))
                                        .div(lastRewardUpdateTotalStakedToken)
                                        .div(new BigNumber(cakePrice).div(new BigNumber(plantPrice)))
                                        .multipliedBy(new BigNumber(100))

  const rewardTokenApyFormated = rewardTokenApy.toNumber().toFixed(2)
  const plantTokenApyFormated = plantTokenApy.toNumber().toFixed(2)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const handleApproveReward = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApproveReward()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApproveReward, setRequestedApproval])
  
  const handleApprovePlantReward = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprovePlantReward()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprovePlantReward, setRequestedApproval])

  return (
    <Card isActive={isCardActive} isFinished={isFinished}>
      {isFinished && <VerticalGardenFinishedSash />}
      <VerticalGardenWindMill />
      <div style={{ padding: '16px' }}>
        <CardTitle isFinished={isFinished}>
          <div style={{ flex: 2 }}>
            <Text>Stake:</Text>

          </div>
          <div style={{ flex: 1 }}>
            {stakingToken.symbol}
            <Image src={`/images/tokens/${verticalGardenMainImage}`} alt={stakingToken.symbol} width={42} height={42} />

            <StyledCardReward>
              <FlexFull><Text>Earn:</Text></FlexFull>
            </StyledCardReward>
            {verticalGardenMasterGardenerAllocPt > 0 ? (
              <StyledCardReward>
                <FlexFull><Image src={`/images/tokens/${verticalGardenSmallImageTwo}`} alt={verticalEarningToken.symbol} width={36} height={36} /></FlexFull>
                <FlexFull>{verticalEarningToken.symbol}</FlexFull>
                <FlexFull>&nbsp;&nbsp;&nbsp;{TranslateString(999, 'and')}&nbsp;&nbsp;&nbsp;&nbsp;</FlexFull>
                <FlexFull><Image src={`/images/tokens/${verticalGardenSmallImageOne}`} alt={stakingRewardToken.symbol} width={36} height={36} />&nbsp;&nbsp;</FlexFull>
                <FlexFull>{stakingRewardToken.symbol}</FlexFull>
              </StyledCardReward>
            ) : (
              <StyledCardReward>
                <FlexFull><Image src={`/images/tokens/${verticalGardenSmallImageOne}`} alt={stakingRewardToken.symbol} width={36} height={36} /></FlexFull>
                <FlexFull>{stakingRewardToken.symbol}</FlexFull>
                <FlexFull>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FlexFull>
              </StyledCardReward>
            )}
            <Text>APY:</Text>
            
            {isFinished || !plantTokenApyFormated || verticalGardenMasterGardenerAllocPt === 0 ? (
              ''
            ) : (
              <StyledCardAPY>
                <FlexFull>{verticalEarningToken.symbol}</FlexFull>
                <Tooltip content={
                  <SmallerText>
                    <div>{verticalEarningToken.symbol}{TranslateString(999, ' APY is base on this formula')}
                      <br />
                      <br />{TranslateString(999, 'rewardTokenApy = lastRewardUpdateRewardTokenGained')}
                      <br />&nbsp;{TranslateString(999, '.div((lastRewardUpdateBlock)')}
                      <br />&nbsp;&nbsp;{TranslateString(999, '.minus(lastRewardUpdateBlockPrevious))')}
                      <br />&nbsp;{TranslateString(999, '.multipliedBy(10512000)')}
                      <br />&nbsp;{TranslateString(999, '.div(lastRewardUpdateTotalStakedToken)')}
                      <br />&nbsp;{TranslateString(999, '.div((stakeTokenPrice)')}
                      <br />&nbsp;&nbsp;{TranslateString(999, '.div(plantPrice)))')}
                      <br />&nbsp;{TranslateString(999, '.multipliedBy(100)')}
                    </div>
                  </SmallerText>
                  }>
                  {plantTokenApyFormated}&nbsp;% APY&nbsp;
                  <HelpIcon color="textSubtle" />
                </Tooltip>
              </StyledCardAPY>
            )}
            {isFinished || !rewardTokenApyFormated ? (
              '-'
            ) : (
              <StyledCardAPY>
                <FlexFull>{stakingRewardToken.symbol}</FlexFull>
                <Tooltip content={
                  <SmallerText>
                    <div>{stakingRewardToken.symbol}{TranslateString(999, ' APY is base on this formula')}
                      <br />
                      <br />{TranslateString(999, 'rewardTokenApy = lastRewardUpdateRewardTokenGained')}
                      <br />&nbsp;{TranslateString(999, '.div((lastRewardUpdateBlock)')}
                      <br />&nbsp;&nbsp;{TranslateString(999, '.minus(lastRewardUpdateBlockPrevious))')}
                      <br />&nbsp;{TranslateString(999, '.multipliedBy(10512000)')}
                      <br />&nbsp;{TranslateString(999, '.div(lastRewardUpdateTotalStakedToken)')}
                        <br />&nbsp;{TranslateString(999, '.div((stakedTokenPrice)')}
                        <br />&nbsp;&nbsp;{TranslateString(999, '.div(rewardTokenPrice)))')}
                      <br />&nbsp;{TranslateString(999, '.multipliedBy(100)')}
                    </div>
                  </SmallerText>
                }>
                {rewardTokenApyFormated}&nbsp;% APY&nbsp;
                <HelpIcon color="textSubtle" />
                </Tooltip>
              </StyledCardAPY>
            )}
          </div>
        </CardTitle>
        {account && (
          <StyledDetails>
            {verticalGardenMasterGardenerAllocPt > 0 && (
              <FlexFull>
                <Row mb="4px">
                  <Text>{TranslateString(330, `${verticalEarningToken.symbol} earned`)}</Text>
                </Row>
                <Row mb="4px">
                  <BalanceAndCompound>
                      <Balance value={getBalanceNumber(earningsPlant)} isDisabled={isFinished} decimals={earningDecimal} />
                  </BalanceAndCompound>
                </Row>
              </FlexFull>
            )}
            <FlexFull>
              <Row mb="4px">
                <Text>{TranslateString(330, `${stakingRewardToken.symbol} earned`)}</Text>
              </Row>
              <Row mb="4px">
                <BalanceAndCompound>
                  <Balance value={getBalanceNumber(earnings)} isDisabled={isFinished} decimals={earningPlantDecimal} />
                </BalanceAndCompound>
              </Row>
            </FlexFull>
          </StyledDetails>
        )}
      <StyledCardActions>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Stake/Unstake Compound/Harvest')} <Icon />
        </StyledDetailsButton>
      </StyledCardActions>
      {isOpen && (
        <StyledCardActions>
          <Row mb="4px">
            {!account && <UnlockButton />}
            <FlexFull>{account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Collecting') : TranslateString(562, 'Harvest')}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}
              />
            )}
            {account && harvest && stakingToken === stakingRewardToken &&(
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
                onClick={onPresentCompound}
              />
              )}</FlexFull>
          </Row>
          <Row mb="4px">&nbsp;
            {account &&
              (needsApproval ? (
                <div style={{ flex: 1 }}>
                  <Button disabled={isFinished || requestedApproval} onClick={handleApprove} width="100%">
                    {`Approve ${stakingToken.symbol}`}
                  </Button>
              </div>
              ) : (
                <>
                  <Button
                    disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                    onClick={onPresentWithdraw}
                  >
                    {`Unstake ${stakingToken.symbol}`}
                  </Button>
                  <StyledActionSpacer />
                    <IconButton disabled={isFinished} onClick={onPresentDeposit}>
                      <AddIcon color="white" />
                    </IconButton>
                </>
              ))}
          </Row>
          <Row mb="4px">
            {account && stakingToken !== stakingRewardToken && 
              (needsApprovalReward ? (
                <div style={{ flex: 1 }}>
                <Button disabled={isFinished} onClick={handleApproveReward} width="100%">
                  {`Approve ${stakingRewardToken.symbol}`}
                </Button>
              </div>
              ) : (
                <>
                </>
              ))}

            {account &&
              (needsApprovalPlantReward && verticalGardenMasterGardenerAllocPt > 0 ? (
                <div style={{ flex: 1 }}>
                <Button disabled={isFinished} onClick={handleApprovePlantReward} width="100%">
                  {`Approve ${verticalEarningToken.symbol}`}
                </Button>
              </div>
              ) : (
                <>
                </>
              ))}
          </Row>
        </StyledCardActions>
      )}
      {isOpen && (
        <CardFooter
          vgId={vgId}
          projectLink={stakingRewardToken.projectLink}
          decimals={stakingToken.decimals}
          totalStaked={totalStaked}
          totalStakedBusd={totalStakedBusd}
          harvest={harvest}
          harvestedReward={harvestedReward}
          harvestedPlant={harvestedPlant}
          compoundedReward={compoundedReward}
          startBlock={startBlock}
          endBlock={endBlock}
          isFinished={isFinished}
          stakedTokenPrice={stakedTokenPrice}
          verticalGardenMasterGardenerAllocPt={verticalGardenMasterGardenerAllocPt}
          verticalGardenCategory={verticalGardenCategory}
          tokenStakedName={stakingToken.symbol}
          tokenRewardName={stakingRewardToken.symbol}
          tokenStakedAddress={stakingToken.address ? getAddress(stakingToken.address) : ''}
          tokenStakedRewardName={stakingRewardToken.symbol}
          tokenStakedRewardAddress={stakingRewardToken.address ? getAddress(stakingRewardToken.address) : ''}
          tokenEarnName={verticalEarningToken.symbol}
          tokenEarnAddress={verticalEarningToken.address ? getAddress(verticalEarningToken.address) : ''}
          tokenDecimals={verticalEarningToken.decimals}
          stakedBalance={stakedBalance}
          stakedBalanceBusd={stakedBalanceBusd}
          stakingTokenDecimals = {stakingToken.decimals}
          depositFee={depositFee}
          rewardCut={rewardCut}
          lastUpdate={lastUpdate}
        />
      )}
      </div>
    </Card>
  )
}

const VerticalGardenFinishedSash = styled.div`
  background-image: url('/images/verticalGarden-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -12px;
  top: -12px;
  width: 135px;
`

const VerticalGardenWindMill = styled.div`
  background-image: url('/images/verticalGarden-windMill.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 180px;
  position: absolute;
  right: -12px;
  top: -12px;
  width: 180px;
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

const SmallerText = styled.div`
font-size: 14px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 0;
  width: 100%;
  box-sizing: border-box;
`

const Row = styled(Flex)`
  align-items: left;
`

const StyledCardReward = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 16px;
  width: 100%;
  box-sizing: border-box;
`

const StyledCardAPY = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 0px;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

const FlexFull = styled.div`
  flex: 1;
`

export default VerticalGardenCard
