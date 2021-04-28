import farmsConfig from './farms'
import pancakeSwapFarmsConfig from './pancakeSwapFarms'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.token.symbol)

export { farmsConfig, communityFarms }
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'

const pancakeSwapCommunityFarms = pancakeSwapFarmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.token.symbol)

export { pancakeSwapFarmsConfig, pancakeSwapCommunityFarms }