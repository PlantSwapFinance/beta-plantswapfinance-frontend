/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import cafeswapFarmsConfig from 'config/constants/cafeswapFarms'
import fetchCafeswapFarms from './fetchCafeswapFarms'
import {
  fetchCafeswapFarmUserEarnings,
  fetchCafeswapFarmUserAllowances,
  fetchCafeswapFarmUserTokenBalances,
  fetchCafeswapFarmUserStakedBalances,
} from './fetchCafeswapFarmUser'
import { CafeswapFarmsState, CafeswapFarm } from '../types'

const initialState: CafeswapFarmsState = { data: [...cafeswapFarmsConfig] }

export const cafeswapFarmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setCafeswapFarmsPublicData: (state, action) => {
      const liveFarmsData: CafeswapFarm[] = action.payload
      state.data = state.data.map((cafeswapFarms) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === cafeswapFarms.pid)
        return { ...cafeswapFarms, ...liveFarmData }
      })
    },
    setCafeswapFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setCafeswapFarmsPublicData, setCafeswapFarmUserData } = cafeswapFarmsSlice.actions

// Thunks
export const fetchCafeswapFarmsPublicDataAsync = () => async (dispatch) => {
  const cafeswapFarms = await fetchCafeswapFarms()
  dispatch(setCafeswapFarmsPublicData(cafeswapFarms))
}
export const fetchCafeswapFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchCafeswapFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchCafeswapFarmUserTokenBalances(account)
  const userStakedBalances = await fetchCafeswapFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchCafeswapFarmUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setCafeswapFarmUserData({ arrayOfUserDataObjects }))
}

export default cafeswapFarmsSlice.reducer
