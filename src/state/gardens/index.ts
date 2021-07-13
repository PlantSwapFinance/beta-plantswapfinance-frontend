/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import fetchGardens from './fetchGardens'
import {
  fetchGardenUserEarnings,
  fetchGardenUserAllowances,
  fetchGardenUserTokenBalances,
  fetchGardenUserStakedBalances,
} from './fetchGardenUser'
import { FarmsState, Farm } from '../types'

const initialState: FarmsState = { data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setGardensPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setGardenUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setGardensPublicData, setGardenUserData } = farmsSlice.actions

// Thunks
export const fetchGardensPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchGardens()
  dispatch(setGardensPublicData(farms))
}
export const fetchGardenUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchGardenUserAllowances(account)
  const userFarmTokenBalances = await fetchGardenUserTokenBalances(account)
  const userStakedBalances = await fetchGardenUserStakedBalances(account)
  const userFarmEarnings = await fetchGardenUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setGardenUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
