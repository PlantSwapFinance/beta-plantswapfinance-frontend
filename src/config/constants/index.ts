import farmsConfig from './farms'
import pancakeSwapFarmsConfig from './pancakeSwapFarms'
import barnsBetaConfig from './barnsBeta'
import gooseFarmsConfig from './gooseFarms'
import cafeswapFarmsConfig from './cafeswapFarms'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.token.symbol)
const communityBarnsBeta = barnsBetaConfig.filter((barnBeta) => barnBeta.isCommunity).map((barnBeta) => barnBeta.token.symbol)

export { farmsConfig, communityFarms }
export { default as verticalGardensConfig } from './verticalGardens'
export { barnsBetaConfig, communityBarnsBeta }
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'

const pancakeSwapCommunityFarms = pancakeSwapFarmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.token.symbol)
const gooseCommunityFarms = gooseFarmsConfig.filter((gooseFarm) => gooseFarm.isCommunity).map((gooseFarm) => gooseFarm.token.symbol)
const cafeswapCommunityFarms = cafeswapFarmsConfig.filter((cafeswapFarm) => cafeswapFarm.isCommunity).map((cafeswapFarm) => cafeswapFarm.token.symbol)

export { pancakeSwapFarmsConfig, pancakeSwapCommunityFarms }
export { gooseFarmsConfig, gooseCommunityFarms }
export { cafeswapFarmsConfig, cafeswapCommunityFarms }