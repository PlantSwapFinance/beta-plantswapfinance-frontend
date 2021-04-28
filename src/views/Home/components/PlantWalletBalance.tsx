import React from 'react'
import { Text } from '@plantswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPlantAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricePlantBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const PlantWalletBalance = () => {
  const TranslateString = useI18n()
  const plantBalance = useTokenBalance(getPlantAddress())
  const plantPriceBusd = usePricePlantBusd()
  const busdBalance = new BigNumber(getBalanceNumber(plantBalance)).multipliedBy(plantPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(plantBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {!plantPriceBusd.eq(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default PlantWalletBalance