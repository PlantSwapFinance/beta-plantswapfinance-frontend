import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchGooseFarmUserDataAsync } from 'state/actions'
import { unstake } from 'utils/callHelpers'
import { useMasterchefGoose } from '../useContract'

const useUnstakeGoose = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefGooseContract = useMasterchefGoose()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefGooseContract, pid, amount, account)
      dispatch(fetchGooseFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefGooseContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeGoose
