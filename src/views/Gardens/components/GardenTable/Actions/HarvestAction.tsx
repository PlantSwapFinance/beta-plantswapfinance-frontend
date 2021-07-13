import React, { useState, useRef, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, useModal } from '@plantswap-libs/uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Gardens/components/GardenCard/GardenCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import useStake from 'hooks/useStake'
import useI18n from 'hooks/useI18n'
import { usePricePlantBusd } from 'state/hooks'
import { useCountUp } from 'react-countup'
import ShareModal from 'views/Gardens/components/ShareModal'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

const CompoundAndHarvest = styled.div`
  padding: 0px
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData, token, lpSymbol }) => {
  const { account } = useWeb3React()
  const earningsBigNumber = userData && account ? new BigNumber(userData.earnings) : null
  const plantPrice = usePricePlantBusd()
  let earnings = null
  let earningsBusd = 0
  let displayBalance = '?'

  if (earningsBigNumber) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(plantPrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const pidPlant = 0
  const { onStake } = useStake(pidPlant)
  const [onHarvestDone] = useModal(<ShareModal harvested={displayBalance} tokenHarvested={token.symbol} tokenName={lpSymbol} usdHarvested={earningsBusd} />)
  const [onCompoundDone] = useModal(<ShareModal harvested={displayBalance} type="compound" tokenHarvested={token.symbol} tokenName={lpSymbol} usdHarvested={earningsBusd} />)
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
        <Title>PLANT </Title>
        <Subtle>{TranslateString(999, 'EARNED')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          <Staked>~{countUp}USD</Staked>
        </div>
        <CompoundAndHarvest>
          {pid === 0 ? (
          <Button
              disabled={earnings === 0 || pendingTx}
              size="sm"
              variant="secondary"
              marginBottom="6px"
              onClick={async () => {
                setPendingTx(true)
                await onStake(earnings.toString())
                setPendingTx(false)
                onCompoundDone()
              }}
              >
                {TranslateString(999, 'Compound')}
              </Button>
            ) : null}

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
        </CompoundAndHarvest>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction