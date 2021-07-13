import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, useModal } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricePlantBusd } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import ShareModal from 'views/Farms/components/ShareModal'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  lpSymbol?: string
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, lpSymbol }) => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const plantPrice = usePricePlantBusd()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  let earningsBusd = 0

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  earningsBusd = new BigNumber(rawEarningsBalance).multipliedBy(plantPrice).toNumber()
  const displayBalance = rawEarningsBalance.toLocaleString()

  const [onHarvestDone] = useModal(<ShareModal harvested={displayBalance} tokenHarvested="PLANT" tokenName={lpSymbol} usdHarvested={earningsBusd} />)

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
          onHarvestDone()
        }}
      >
        {TranslateString(562, 'Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
