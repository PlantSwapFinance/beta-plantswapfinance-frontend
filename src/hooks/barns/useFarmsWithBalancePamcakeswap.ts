import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefPancakeSwapAddress } from 'utils/addressHelpers'
import masterChefPancakeSwapABI from 'config/abi/masterchef.json'
import { pancakeSwapFarmsConfig } from 'config/constants'
import { PancakeSwapFarmConfig } from 'config/constants/types'
import useRefresh from '../useRefresh'

export interface FarmWithBalance extends PancakeSwapFarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = pancakeSwapFarmsConfig.map((pancakeSwapFarm) => ({
        address: getMasterChefPancakeSwapAddress(),
        name: 'pendingCake',
        params: [pancakeSwapFarm.pid, account],
      }))

      const rawResults = await multicall(masterChefPancakeSwapABI, calls)
      const results = pancakeSwapFarmsConfig.map((pancakeSwapFarm, index) => ({ ...pancakeSwapFarm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
