import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefGooseAddress } from 'utils/addressHelpers'
import masterChefGooseABI from 'config/abi/masterchef.json'
import { gooseFarmsConfig } from 'config/constants'
import { GooseFarmConfig } from 'config/constants/types'
import useRefresh from '../useRefresh'

export interface FarmWithBalance extends GooseFarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = gooseFarmsConfig.map((farm) => ({
        address: getMasterChefGooseAddress(),
        name: 'pendingEgg',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterChefGooseABI, calls)
      const results = gooseFarmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
