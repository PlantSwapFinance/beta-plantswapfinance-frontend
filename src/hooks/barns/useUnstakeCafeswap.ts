import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchCafeswapFarmUserDataAsync } from 'state/actions'
import { unstake } from 'utils/callHelpers'
import { useMasterchefCafeswap } from '../useContract'

const useUnstakeCafeswap = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefCafeswapContract = useMasterchefCafeswap()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefCafeswapContract, pid, amount, account)
      dispatch(fetchCafeswapFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefCafeswapContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeCafeswap
