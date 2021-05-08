/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import gooseFarmsConfig from 'config/constants/gooseFarms'
import fetchGooseFarms from './fetchGooseFarms'
import {
  fetchGooseFarmUserEarnings,
  fetchGooseFarmUserAllowances,
  fetchGooseFarmUserTokenBalances,
  fetchGooseFarmUserStakedBalances,
} from './fetchGooseFarmUser'
import { GooseFarmsState, GooseFarm } from '../types'

const initialState: GooseFarmsState = { data: [...gooseFarmsConfig] }

export const gooseFarmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setGooseFarmsPublicData: (state, action) => {
      const liveFarmsData: GooseFarm[] = action.payload
      state.data = state.data.map((gooseFarms) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === gooseFarms.pid)
        return { ...gooseFarms, ...liveFarmData }
      })
    },
    setGooseFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setGooseFarmsPublicData, setGooseFarmUserData } = gooseFarmsSlice.actions

// Thunks
export const fetchGooseFarmsPublicDataAsync = () => async (dispatch) => {
  const gooseFarms = await fetchGooseFarms()
  dispatch(setGooseFarmsPublicData(gooseFarms))
}
export const fetchGooseFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchGooseFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchGooseFarmUserTokenBalances(account)
  const userStakedBalances = await fetchGooseFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchGooseFarmUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setGooseFarmUserData({ arrayOfUserDataObjects }))
}

export default gooseFarmsSlice.reducer
