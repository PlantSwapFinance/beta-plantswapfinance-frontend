import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefCafeswapAddress } from 'utils/addressHelpers'
import masterChefCafeswapABI from 'config/abi/masterchef.json'
import { cafeswapFarmsConfig } from 'config/constants'
import { CafeswapFarmConfig } from 'config/constants/types'
import useRefresh from '../useRefresh'

export interface FarmWithBalance extends CafeswapFarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = cafeswapFarmsConfig.map((farm) => ({
        address: getMasterChefCafeswapAddress(),
        name: 'pendingBrew',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterChefCafeswapABI, calls)
      const results = cafeswapFarmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
