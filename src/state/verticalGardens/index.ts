/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import verticalGardensConfig from 'config/constants/verticalGardens'
import { fetchVerticalGardenTotalStaked } from './fetchVerticalGardens'
import {
  fetchVerticalGardensAllowance,
  fetchVerticalGardensRewardAllowance, 
  fetchVerticalGardensAllowancePlant,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  fetchUserPendingPlantRewards,
  fetchUserHarvestedRewards,
  fetchUserHarvestedPlants,
  fetchUserCompoundedRewards,
} from './fetchVerticalGardensUser'
import { VerticalGardensState, VerticalGarden } from '../types'

const initialState: VerticalGardensState = { data: [...verticalGardensConfig] }

export const VerticalGardensSlice = createSlice({
  name: 'VerticalGardens',
  initialState,
  reducers: {
    setVerticalGardensPublicData: (state, action) => {
      const liveVerticalGardensData: VerticalGarden[] = action.payload
      state.data = state.data.map((verticalGarden) => {
        const liveVerticalGardenData = liveVerticalGardensData.find((entry) => entry.vgId === verticalGarden.vgId)
        return { ...verticalGarden, ...liveVerticalGardenData }
      })
    },
    setVerticalGardensUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((verticalGarden) => {
        const userVerticalGardenData = userData.find((entry) => entry.vgId === verticalGarden.vgId)
        return { ...verticalGarden, userData: userVerticalGardenData }
      })
    },
    updateVerticalGardensUserData: (state, action) => {
      const { field, value, vgId } = action.payload
      const index = state.data.findIndex((p) => p.vgId === vgId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setVerticalGardensPublicData, setVerticalGardensUserData, updateVerticalGardensUserData } = VerticalGardensSlice.actions

// Thunks
export const fetchVerticalGardensPublicDataAsync = () => async (dispatch) => {
  const totalStakeds = await fetchVerticalGardenTotalStaked()

  const liveData = verticalGardensConfig.map((verticalGarden) => {
    const totalStaked = totalStakeds.find((entry) => entry.vgId === verticalGarden.vgId)
    return {
      ...totalStaked,
    }
  })

  dispatch(setVerticalGardensPublicData(liveData))
}

export const fetchVerticalGardensUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchVerticalGardensAllowance(account)
  const allowancesReward = await fetchVerticalGardensRewardAllowance(account)
  const allowancesPlant = await fetchVerticalGardensAllowancePlant(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)
  const pendingPlantRewards = await fetchUserPendingPlantRewards(account)
  const harvestedRewards = await fetchUserHarvestedRewards(account)
  const harvestedPlants = await fetchUserHarvestedPlants(account)
  const compoundedRewards= await fetchUserCompoundedRewards(account)

  const userData = verticalGardensConfig.map((verticalGarden) => ({
    vgId: verticalGarden.vgId,
    allowance: allowances[verticalGarden.vgId],
    allowanceReward: allowancesReward[verticalGarden.vgId],
    allowancePlant: allowancesPlant[verticalGarden.vgId],
    stakingTokenBalance: stakingTokenBalances[verticalGarden.vgId],
    stakedBalance: stakedBalances[verticalGarden.vgId],
    pendingReward: pendingRewards[verticalGarden.vgId],
    pendingPlantReward: pendingPlantRewards[verticalGarden.vgId],
    harvestedReward: harvestedRewards[verticalGarden.vgId],
    harvestedPlant: harvestedPlants[verticalGarden.vgId],
    compoundedReward: compoundedRewards[verticalGarden.vgId],
  }))

  dispatch(setVerticalGardensUserData(userData))
}

export const vgupdateUserAllowance = (vgId: string, account: string) => async (dispatch) => {
  const allowances = await fetchVerticalGardensAllowance(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'allowance', value: allowances[vgId] }))
}

export const vgupdateUserBalance = (vgId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'stakingTokenBalance', value: tokenBalances[vgId] }))
}

export const vgupdateUserStakedBalance = (vgId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'gardeners', value: stakedBalances[vgId] }))
}

export const vgupdateUserPendingReward = (vgId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'pendingRewardToken', value: pendingRewards[vgId] }))
}

export const vgupdateUserPendingPlantReward = (vgId: string, account: string) => async (dispatch) => {
  const pendingPlantRewards = await fetchUserPendingPlantRewards(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'pendingPlantReward', value: pendingPlantRewards[vgId] }))
}

export const vgupdateUserHarvestedReward = (vgId: string, account: string) => async (dispatch) => {
  const harvestedRewards = await fetchUserHarvestedRewards(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'harvestedReward', value: harvestedRewards[vgId] }))
}

export const vgupdateUserHarvestedPlant = (vgId: string, account: string) => async (dispatch) => {
  const harvestedPlants = await fetchUserHarvestedPlants(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'harvestedPlant', value: harvestedPlants[vgId] }))
}

export const vgupdateUserCompoundedReward = (vgId: string, account: string) => async (dispatch) => {
  const harvestedPlants = await fetchUserCompoundedRewards(account)
  dispatch(updateVerticalGardensUserData({ vgId, field: 'compoudedReward', value: harvestedPlants[vgId] }))
}

export default VerticalGardensSlice.reducer
