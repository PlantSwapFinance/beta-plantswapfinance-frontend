import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { verticalUpdate } from 'utils/callHelpers'
import { useVerticalGarden } from './useContract'

export const useVerticalGardenUpdate = (vgId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const verticalGardenContract = useVerticalGarden(vgId)

  const handleUpdate = useCallback(async () => {
    await verticalUpdate(verticalGardenContract, account)

    dispatch(updateUserPendingReward(vgId, account))
    dispatch(updateUserBalance(vgId, account))
  }, [account, dispatch, verticalGardenContract, vgId])

  return { onUpdate: handleUpdate }
}

export const useVerticalFarmUpdate = (vgId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const verticalGardenContract = useVerticalGarden(vgId)

  const handleUpdate = useCallback(async () => {
    await verticalUpdate(verticalGardenContract, account)

    dispatch(updateUserPendingReward(vgId, account))
    dispatch(updateUserBalance(vgId, account))
  }, [account, dispatch, verticalGardenContract, vgId])

  return { onUpdate: handleUpdate }
}
