import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchPancakeSwapFarmUserDataAsync } from 'state/actions'
import { unstake } from 'utils/callHelpers'
import { useMasterchefPancakeSwap } from '../useContract'

const useUnstakePancakeswap = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefPancakeSwapContract = useMasterchefPancakeSwap()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefPancakeSwapContract, pid, amount, account)
      dispatch(fetchPancakeSwapFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefPancakeSwapContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePancakeswap
