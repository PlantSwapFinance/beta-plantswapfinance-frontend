/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import barnsBetaConfig from 'config/constants/barnsBeta'
import fetchBarnsBeta from './fetchBarnsBeta'
import {
  fetchBarnBetaUserEarnings,
  fetchBarnBetaUserAllowances,
  fetchBarnBetaUserTokenBalances,
  fetchBarnBetaUserStakedBalances,
} from './fetchBarnBetaUser'
import { BarnsBetaState, BarnBeta } from '../types'

const initialState: BarnsBetaState = { data: [...barnsBetaConfig] }

export const barnsBetaSlice = createSlice({
  name: 'BarnsBeta',
  initialState,
  reducers: {
    setBarnsBetaPublicData: (state, action) => {
      const liveBarnsBetaData: BarnBeta[] = action.payload
      state.data = state.data.map((barnBeta) => {
        const liveBarnBetaData = liveBarnsBetaData.find((f) => f.pid === barnBeta.pid)
        return { ...barnBeta, ...liveBarnBetaData }
      })
    },
    setBarnBetaUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setBarnsBetaPublicData, setBarnBetaUserData } = barnsBetaSlice.actions

// Thunks
export const fetchBarnsBetaPublicDataAsync = () => async (dispatch) => {
  const barnsBeta = await fetchBarnsBeta()
  dispatch(setBarnsBetaPublicData(barnsBeta))
}
export const fetchBarnBetaUserDataAsync = (account) => async (dispatch) => {
  const userBarnBetaAllowances = await fetchBarnBetaUserAllowances(account)
  const userBarnBetaTokenBalances = await fetchBarnBetaUserTokenBalances(account)
  const userStakedBalances = await fetchBarnBetaUserStakedBalances(account)
  const userBarnBetaEarnings = await fetchBarnBetaUserEarnings(account)

  const arrayOfUserDataObjects = userBarnBetaAllowances.map((barnBetaAllowance, index) => {
    return {
      index,
      allowance: userBarnBetaAllowances[index],
      tokenBalance: userBarnBetaTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userBarnBetaEarnings[index],
    }
  })

  dispatch(setBarnBetaUserData({ arrayOfUserDataObjects }))
}

export default barnsBetaSlice.reducer
