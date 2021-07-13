import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchPancakeSwapFarmUserDataAsync } from 'state/actions'
import { harvest } from 'utils/callHelpers'
import { useMasterchefPancakeSwap } from '../useContract'

export const useHarvestPancakeswap
 = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchefPancakeSwap()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchPancakeSwapFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvestPancakeswap = (farmPids: number[]) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchefPancakeSwap()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}
