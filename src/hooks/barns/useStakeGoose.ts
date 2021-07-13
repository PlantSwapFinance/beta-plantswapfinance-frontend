import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchGooseFarmUserDataAsync } from 'state/actions'
import { stake } from 'utils/callHelpers'
import { useMasterchefGoose } from '../useContract'

const useStakeGoose = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefGooseContract = useMasterchefGoose()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefGooseContract, pid, amount, account)
      dispatch(fetchGooseFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefGooseContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeGoose
