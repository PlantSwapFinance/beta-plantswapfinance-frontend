/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import fetchPlantswapFarms from './fetchPlantswapFarms'
import {
  fetchPlantswapFarmUserEarnings,
  fetchPlantswapFarmUserAllowances,
  fetchPlantswapFarmUserTokenBalances,
  fetchPlantswapFarmUserStakedBalances,
} from './fetchPlantswapFarmUser'
import { PlantswapFarmsState, PlantswapFarm } from '../types'

const initialState: PlantswapFarmsState = { data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setPlantswapFarmsPublicData: (state, action) => {
      const liveFarmsData: PlantswapFarm[] = action.payload
      state.data = state.data.map((plantswapFarm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === plantswapFarm.pid)
        return { ...plantswapFarm, ...liveFarmData }
      })
    },
    setPlantswapFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setPlantswapFarmsPublicData, setPlantswapFarmUserData } = farmsSlice.actions

// Thunks
export const fetchPlantswapFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchPlantswapFarms()
  dispatch(setPlantswapFarmsPublicData(farms))
}
export const fetchPlantswapFarmUserDataAsync = (account) => async (dispatch) => {
  const userPlantswapFarmAllowances = await fetchPlantswapFarmUserAllowances(account)
  const userPlantswapFarmTokenBalances = await fetchPlantswapFarmUserTokenBalances(account)
  const userPlantswapStakedBalances = await fetchPlantswapFarmUserStakedBalances(account)
  const userPlantswapFarmEarnings = await fetchPlantswapFarmUserEarnings(account)

  const arrayOfUserDataObjects = userPlantswapFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userPlantswapFarmAllowances[index],
      tokenBalance: userPlantswapFarmTokenBalances[index],
      stakedBalance: userPlantswapStakedBalances[index],
      earnings: userPlantswapFarmEarnings[index],
    }
  })

  dispatch(setPlantswapFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
