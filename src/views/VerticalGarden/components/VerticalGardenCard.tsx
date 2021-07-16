import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Tag, Text, HelpIcon } from '@plantswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useVerticalGardenApprove, useVerticalGardenApproveReward, useVerticalGardenApprovePlantReward } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useVerticalGardenStake } from 'hooks/useStake'
import { useVerticalGardensUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { useVerticalGardenHarvest } from 'hooks/useHarvest'
import { useVerticalGardenUpdate } from 'hooks/useUpdate'
import Balance from 'components/Balance'
import { VerticalGarden } from 'state/types'
import { useBlock, usePricePlantBusd, usePriceCakeBusd, usePriceBrewBusd, usePriceOddzBusd, usePriceChessBusd } from 'state/hooks'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'
import Tooltip from './Tooltip'

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
  const { onUpdate } = useVerticalGardenUpdate(vgId)

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

  let stakedRewardTokenPrice
  if(stakingRewardToken.symbol === 'CAKE') {
    stakedRewardTokenPrice = cakePrice
  }
  if(stakingRewardToken.symbol === 'BREW') {
    stakedRewardTokenPrice = brewPrice
  }
  if(stakingRewardToken.symbol === 'ODDZ') {
    stakedRewardTokenPrice = oddzPrice
  }
  if(stakingRewardToken.symbol === 'CHESS') {
    stakedRewardTokenPrice = chessPrice
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

  
  const earningsBalance = getBalanceNumber(earnings)
  const earningsPlantBalance = getBalanceNumber(earningsPlant)
  const earningsBusd = new BigNumber(earningsBalance).multipliedBy(stakedRewardTokenPrice).toFixed(4)
  const earningsPlantBusd = new BigNumber(earningsPlantBalance).multipliedBy(plantPrice).toFixed(4)
  const earningsTotalBusd = new BigNumber(earningsBusd).plus(earningsPlantBusd).toNumber()

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
      <div style={{ padding: '24px' }}>
        <CardTitle isFinished={isFinished}>
          <div style={{ flex: 2 }}>
            <Text>Stake:</Text>

          </div>
          <div style={{ flex: 1 }}>
            {stakingToken.symbol}
            <Image src={`/images/tokens/${verticalGardenMainImage}`} alt={stakingToken.symbol} width={64} height={64} />

            <StyledCardReward>
            <FlexFull><Text>Earn:</Text></FlexFull>
            <FlexFull>&nbsp;</FlexFull>
            <FlexFull>&nbsp;</FlexFull>
            <FlexFull>&nbsp;&nbsp;&nbsp;&nbsp;
            {verticalGardenMasterGardenerAllocPt > 0 ? (
              <MultiplierTag variant="secondary">{vgId === 1 ? 0.6 : 0.3}X</MultiplierTag>
            ) : ('')}
            </FlexFull>
            </StyledCardReward>
            {verticalGardenMasterGardenerAllocPt > 0 ? (
              <StyledCardReward>
                <FlexFull><Image src={`/images/tokens/${verticalGardenSmallImageTwo}`} alt={verticalEarningToken.symbol} width={42} height={42} /></FlexFull>
                <FlexFull>{verticalEarningToken.symbol}</FlexFull>
                <FlexFull>&nbsp;&nbsp;&nbsp;&nbsp;{TranslateString(999, 'and')}&nbsp;&nbsp;&nbsp;&nbsp;</FlexFull>
                <FlexFull><Image src={`/images/tokens/${verticalGardenSmallImageOne}`} alt={stakingRewardToken.symbol} width={42} height={42} /></FlexFull>
                <FlexFull>{stakingRewardToken.symbol}</FlexFull>
              </StyledCardReward>
            ) : (
              <StyledCardReward>
                <FlexFull><Image src={`/images/tokens/${verticalGardenSmallImageOne}`} alt={stakingRewardToken.symbol} width={42} height={42} /></FlexFull>
                <FlexFull>{stakingRewardToken.symbol}</FlexFull>
                <FlexFull>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FlexFull>
              </StyledCardReward>
            )}
            <Text>APY:</Text>
            
            {isFinished || !plantTokenApyFormated || verticalGardenMasterGardenerAllocPt === 0 ? (
              ''
            ) : (
              <StyledCardAPY>
                <FlexFull>{verticalEarningToken.symbol}</FlexFull>
                  <Tooltip content={
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
                }>
                {rewardTokenApyFormated}&nbsp;% APY&nbsp;
                  <HelpIcon color="textSubtle" />
                </Tooltip>
              </StyledCardAPY>
            )}
          </div>
        </CardTitle>
        {verticalGardenMasterGardenerAllocPt > 0 ? (
          <Text>{TranslateString(330, `${verticalEarningToken.symbol} earned`)}</Text>
          ) : ('')}
        <BalanceAndCompound>
          {verticalGardenMasterGardenerAllocPt > 0 ? (
            <Balance value={getBalanceNumber(earningsPlant)} isDisabled={isFinished} decimals={earningDecimal} />
            ) : ('You can vote or propose a PLANT reward for this garden in Governance.')}
          {account && harvest && (
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
          </BalanceAndCompound>
          {verticalGardenMasterGardenerAllocPt > 0 ? (
            <Label isFinished={isFinished} text={TranslateString(330, `${earningsBusd} BUSD`)} />
            ) : ('')}
            
        <br />
        <Text>{TranslateString(330, `${stakingRewardToken.symbol} earned`)}</Text>
        <BalanceAndCompound>
          <Balance value={getBalanceNumber(earnings)} isDisabled={isFinished} decimals={earningPlantDecimal} />
          {account && harvest && stakingToken === stakingRewardToken &&(
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
              onClick={onPresentCompound}
            />
            )}
          </BalanceAndCompound>
        {stakedRewardTokenPrice > 0 && (
          <Label isFinished={isFinished} text={TranslateString(330, `${stakingRewardToken.symbol} earned ${earningsPlantBusd} BUSD`)} />
        )}
        {stakedRewardTokenPrice > 0 && (
          <BalanceAndCompound>
            <Text>Total reward pending in USD</Text>
            <Balance value={earningsTotalBusd} isDisabled={isFinished} decimals={3} />
          </BalanceAndCompound>
        )}
        <StyledCardActions>
          {!account && <UnlockButton />}
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
        </StyledCardActions>
        <StyledDetails>
          <FlexFull>{TranslateString(384, 'Your Stake')}:</FlexFull>
          <Balance
            fontSize="14px"
            decimals={6}
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalance, stakingToken.decimals)}
          />
          &nbsp;
          <LabelRight> {stakingToken.symbol}</LabelRight>
        </StyledDetails>
        {stakedTokenPrice > 0 && (
        <StyledDetails>
          <FlexFull>{TranslateString(384, 'Your Stake in BUSD')}:</FlexFull>
          <Balance
            fontSize="14px"
            decimals={2}
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalanceBusd, stakingToken.decimals)}
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
            > {TranslateString(384, 'Reward cut ')} ({stakingRewardToken.symbol} only) <HelpIcon color="textSubtle" />:
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
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Updating') : TranslateString(704, 'Update reward')}
              onClick={async () => {
                setPendingTx(true)
                await onUpdate()
                setPendingTx(false)
              }}
            />
            )}
          </StyledDetails>
      </div>
      <CardFooter
        projectLink={stakingRewardToken.projectLink}
        decimals={stakingToken.decimals}
        totalStaked={totalStaked}
        totalStakedBusd={totalStakedBusd}
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
      />
    </Card>
  )
}

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  align-items: right;
`

const VerticalGardenFinishedSash = styled.div`
  background-image: url('/images/verticalGarden-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const VerticalGardenWindMill = styled.div`
  background-image: url('/images/verticalGarden-windMill.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 180px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 180px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
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
  margin: 16px 16px;
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
const LabelRight = styled.div`
font-size: 14px;
align-items: right;
font-weight: bold;
color: ${(props) => props.theme.colors.text};
`

const FlexFull = styled.div`
  flex: 1;
`

export default VerticalGardenCard
