import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchPancakeSwapFarmUserDataAsync } from 'state/actions'
import { stake } from 'utils/callHelpers'
import { useMasterchefPancakeSwap } from '../useContract'

const useStakePancakeswap = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefPancakeSwapContract = useMasterchefPancakeSwap()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefPancakeSwapContract, pid, amount, account)
      dispatch(fetchPancakeSwapFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefPancakeSwapContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakePancakeswap
