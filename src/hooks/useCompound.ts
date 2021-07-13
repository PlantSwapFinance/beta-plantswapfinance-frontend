import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { verticalCompound } from 'utils/callHelpers'
import { useVerticalGarden } from './useContract'

export const useVerticalGardenCompound = (vgId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const verticalGardenContract = useVerticalGarden(vgId)

  const handleHarvest = useCallback(async () => {
    await verticalCompound(verticalGardenContract, account)

    dispatch(updateUserPendingReward(vgId, account))
    dispatch(updateUserBalance(vgId, account))
  }, [account, dispatch, verticalGardenContract, vgId])

  return { onReward: handleHarvest }
}

export const useVerticalFarmCompound = (vgId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const verticalGardenContract = useVerticalGarden(vgId)

  const handleHarvest = useCallback(async () => {
    await verticalCompound(verticalGardenContract, account)

    dispatch(updateUserPendingReward(vgId, account))
    dispatch(updateUserBalance(vgId, account))
  }, [account, dispatch, verticalGardenContract, vgId])

  return { onReward: handleHarvest }
}
