import React, { useState, useRef, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, useModal } from '@plantswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/BarnCafeswap/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvestCafeswap } from 'hooks/barns/useHarvestCafeswap'
import useI18n from 'hooks/useI18n'
import { usePriceBrewBusd } from 'state/hooks'
import { useCountUp } from 'react-countup'
import ShareModal from 'views/BarnCafeswap/components/ShareModal'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData, token, lpSymbol }) => {
  const { account } = useWeb3React()
  const earningsBigNumber = userData && account ? new BigNumber(userData.earnings) : null
  const cakePrice = usePriceBrewBusd()
  let earnings = null
  let earningsBusd = 0
  let displayBalance = '?'

  if (earningsBigNumber) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestCafeswap(pid)
  const [onHarvestDone] = useModal(<ShareModal harvested={displayBalance} tokenHarvested={token.symbol} tokenName={lpSymbol} usdHarvested={earningsBusd} />)
  const TranslateString = useI18n()

  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsBusd)
  }, [earningsBusd, updateValue])

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>CAKE </Title>
        <Subtle>{TranslateString(999, 'EARNED')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          <Staked>~{countUp}USD</Staked>
        </div>
        <Button
          disabled={!earnings || pendingTx || !account}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
            onHarvestDone()
          }}
          ml="4px"
        >
          {TranslateString(562, 'Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
