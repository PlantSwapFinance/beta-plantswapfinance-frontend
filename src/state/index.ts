import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import gardensReducer from './gardens'
import barnsBetaReducer from './barnsBeta'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import pricesReducer from './prices'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'
import plantswapFarmsReducer from './plantswapFarms'
import pancakeSwapFarmsReducer from './pancakeSwapFarms'
import gooseFarmsReducer from './gooseFarms'
import cafeswapFarmsReducer from './cafeswapFarms'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    gardens: gardensReducer,
    barnsBeta: barnsBetaReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    prices: pricesReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
    block: blockReducer,
    plantswapFarms: plantswapFarmsReducer,
    pancakeSwapFarms: pancakeSwapFarmsReducer,
    gooseFarms: gooseFarmsReducer,
    cafeswapFarms: cafeswapFarmsReducer,
  },
})
