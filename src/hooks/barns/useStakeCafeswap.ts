import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchCafeswapFarmUserDataAsync } from 'state/actions'
import { stake } from 'utils/callHelpers'
import { useMasterchefCafeswap } from '../useContract'

const useStakeCafeswap = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefCafeswapContract = useMasterchefCafeswap()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefCafeswapContract, pid, amount, account)
      dispatch(fetchCafeswapFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefCafeswapContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeCafeswap
