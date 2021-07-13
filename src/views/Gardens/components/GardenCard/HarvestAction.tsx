import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, Flex, Heading, useModal } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import useStake from 'hooks/useStake'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricePlantBusd } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import ShareModal from 'views/Gardens/components/ShareModal'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  lpSymbol?: string
}

const CompoundAndHarvest = styled.div`
  padding: 0px
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, lpSymbol }) => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const plantPrice = usePricePlantBusd()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const pidPlant = 0
  const { onStake } = useStake(pidPlant)
  let earningsBusd = 0

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  earningsBusd = new BigNumber(rawEarningsBalance).multipliedBy(plantPrice).toNumber()
  const displayBalance = rawEarningsBalance.toLocaleString()

  const [onHarvestDone] = useModal(<ShareModal harvested={displayBalance} tokenHarvested="PLANT" tokenName={lpSymbol} usdHarvested={earningsBusd} />)
  const [onCompoundDone] = useModal(<ShareModal harvested={displayBalance} type="compound" tokenHarvested="PLANT" tokenName={lpSymbol} usdHarvested={earningsBusd} />)

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <CompoundAndHarvest>
        {pid === 0 ? (
        <Button
            disabled={rawEarningsBalance === 0 || pendingTx}
            size="sm"
            variant="secondary"
            marginBottom="6px"
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
              onCompoundDone()
            }}
            >
              {TranslateString(999, 'Compound')}
            </Button>
          ) : null}

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
      </CompoundAndHarvest>
    </Flex>
  )
}

export default HarvestAction
