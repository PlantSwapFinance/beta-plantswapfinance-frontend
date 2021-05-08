/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import pancakeSwapFarmsConfig from 'config/constants/pancakeSwapFarms'
import fetchPancakeSwapFarms from './fetchPancakeSwapFarms'
import {
  fetchPancakeSwapFarmUserEarnings,
  fetchPancakeSwapFarmUserAllowances,
  fetchPancakeSwapFarmUserTokenBalances,
  fetchPancakeSwapFarmUserStakedBalances,
} from './fetchPancakeSwapFarmUser'
import { PancakeSwapFarmsState, PancakeSwapFarm } from '../types'

const initialState: PancakeSwapFarmsState = { data: [...pancakeSwapFarmsConfig] }

export const pancakeSwapFarmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setPancakeSwapFarmsPublicData: (state, action) => {
      const liveFarmsData: PancakeSwapFarm[] = action.payload
      state.data = state.data.map((pancakeSwapFarms) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === pancakeSwapFarms.pid)
        return { ...pancakeSwapFarms, ...liveFarmData }
      })
    },
    setPancakeSwapFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setPancakeSwapFarmsPublicData, setPancakeSwapFarmUserData } = pancakeSwapFarmsSlice.actions

// Thunks
export const fetchPancakeSwapFarmsPublicDataAsync = () => async (dispatch) => {
  const pancakeSwapFarms = await fetchPancakeSwapFarms()
  dispatch(setPancakeSwapFarmsPublicData(pancakeSwapFarms))
}
export const fetchPancakeSwapFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchPancakeSwapFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchPancakeSwapFarmUserTokenBalances(account)
  const userStakedBalances = await fetchPancakeSwapFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchPancakeSwapFarmUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setPancakeSwapFarmUserData({ arrayOfUserDataObjects }))
}

export default pancakeSwapFarmsSlice.reducer
