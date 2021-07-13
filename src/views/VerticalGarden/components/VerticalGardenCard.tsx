import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Text } from '@plantswap-libs/uikit'
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
import Balance from 'components/Balance'
import { VerticalGarden } from 'state/types'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

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
    startBlock,
    endBlock,
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

  const apy = 0

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const allowanceReward = new BigNumber(userData?.allowanceReward || 0)
  const allowancePlant = new BigNumber(userData?.allowancePlant || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const earningsPlant = new BigNumber(userData?.pendingPlantReward || 0)

  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber()
  const needsApprovalReward = !accountHasStakedBalance && !allowanceReward.toNumber()
  const needsApprovalPlantReward = !accountHasStakedBalance && !allowancePlant.toNumber()
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
  const verticalGardenMainImage = `${verticalGarden.stakingToken.symbol}.svg`.toLocaleLowerCase()
  const verticalGardenSmallImageOne = `${verticalGarden.stakingRewardToken.symbol}.svg`.toLocaleLowerCase()
  const verticalGardenSmallImageTwo = `${verticalGarden.verticalEarningToken.symbol}.svg`.toLocaleLowerCase()
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

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
    <Card isActive={isCardActive} isFinished={isFinished && vgId !== 0}>
      {isFinished && vgId !== 0 && <VerticalGardenFinishedSash />}
      <VerticalGardenWindMill />
      <div style={{ padding: '24px' }}>
        <CardTitle isFinished={isFinished && vgId !== 0}>
          <div style={{ flex: 1 }}>
          <Text>Stake:</Text> {stakingToken.symbol}<br />
          
          <Image src={`/images/verticalGardens/${verticalGardenMainImage}`} alt={stakingToken.symbol} width={64} height={64} />
          <Text>Earn:</Text> {verticalEarningToken.symbol}
          <Image src={`/images/verticalGardens/${verticalGardenSmallImageTwo}`} alt={stakingRewardToken.symbol} width={32} height={32} />

          <Text>AND</Text> {stakingRewardToken.symbol}
          <Image src={`/images/verticalGardens/${verticalGardenSmallImageOne}`} alt={verticalEarningToken.symbol} width={32} height={32} />
          </div>
        </CardTitle>
        <BalanceAndCompound>
          <Balance value={getBalanceNumber(earningsPlant)} isDisabled={isFinished} decimals={7} />
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
        <Label isFinished={isFinished && vgId !== 0} text={TranslateString(330, `${verticalEarningToken.symbol} earned`)} />
        <BalanceAndCompound>
          <Balance value={getBalanceNumber(earnings)} isDisabled={isFinished} decimals={9} />
          {account && harvest && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
              onClick={onPresentCompound}
            />
            )}
          </BalanceAndCompound>
        <Label isFinished={isFinished && vgId !== 0} text={TranslateString(330, `${stakingRewardToken.symbol} earned`)} />
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
                  <IconButton disabled={isFinished && vgId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="white" />
                  </IconButton>
              </>
            ))}

          {account && stakingToken !== stakingRewardToken && 
            (needsApprovalReward ? (
              <div style={{ flex: 1 }}>
              <Button disabled={isFinished || requestedApproval} onClick={handleApproveReward} width="100%">
                {`Approve ${stakingRewardToken.symbol}`}
              </Button>
            </div>
            ) : (
              <>
              </>
            ))}

          {account &&
            (needsApprovalPlantReward ? (
              <div style={{ flex: 1 }}>
              <Button disabled={isFinished || requestedApproval} onClick={handleApprovePlantReward} width="100%">
                {`Approve ${verticalEarningToken.symbol}`}
              </Button>
            </div>
            ) : (
              <>
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div>{TranslateString(736, 'APR')}:</div>
          {isFinished || !apy ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails>
          <div>{TranslateString(384, 'Your Stake')}:</div>
          <Balance
            fontSize="14px"
            decimals={6}
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalance, stakingToken.decimals)}
          />
        </StyledDetails>
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
          <div>{TranslateString(384, 'Reward cut ')} ({stakingRewardToken.symbol} only):</div>
          <Balance
            fontSize="14px"
            decimals={2}
            isDisabled={isFinished}
            value={rewardCut / 100}
            unit="%"
          />
        </StyledDetails>
      </div>
      <CardFooter
        projectLink={stakingToken.projectLink}
        decimals={stakingToken.decimals}
        totalStaked={totalStaked}
        startBlock={startBlock}
        endBlock={endBlock}
        isFinished={isFinished}
        verticalGardenCategory={verticalGardenCategory}
        tokenStakedName={stakingToken.symbol}
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

export default VerticalGardenCard
