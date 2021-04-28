/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import pancakeSwapFarmsConfig from 'config/constants/pancakeSwapFarms'
import fetchPancakeSwapFarms from './fetchPancakeSwapFarms'
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
  },
})

// Actions
export const { setPancakeSwapFarmsPublicData } = pancakeSwapFarmsSlice.actions

// Thunks
export const fetchPancakeSwapFarmsPublicDataAsync = () => async (dispatch) => {
  const pancakeSwapFarms = await fetchPancakeSwapFarms()
  dispatch(setPancakeSwapFarmsPublicData(pancakeSwapFarms))
}

export default pancakeSwapFarmsSlice.reducer
