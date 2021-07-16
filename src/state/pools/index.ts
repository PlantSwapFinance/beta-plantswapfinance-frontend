/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { fetchPoolsBlockLimits, fetchPoolsTotalStatking } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()

  const liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
    const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
    return {
      ...blockLimit,
      ...totalStaking,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowancesPool = await fetchPoolsAllowance(account)
  const tokenBalancesPool = await fetchUserBalances(account)
  const stakedBalancesPool = await fetchUserStakeBalances(account)
  const pendingRewardsPool = await fetchUserPendingRewards(account)

  const userData = poolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowancePool: allowancesPool[pool.sousId],
    stakingTokenBalancePool: tokenBalancesPool[pool.sousId],
    stakedBalancePool: stakedBalancesPool[pool.sousId],
    pendingRewardPool: pendingRewardsPool[pool.sousId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowancesPool = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowancesPool[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalancesPool = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalancesPool[sousId] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalancesPool = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalancesPool[sousId] }))
}

export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewardsPool = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewardsPool[sousId] }))
}

export default PoolsSlice.reducer
