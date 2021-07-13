import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getPlantAddress = () => {
  return getAddress(tokens.plant.address)
}
export const getCakeAddress = () => {
  return getAddress(tokens.cake.address)
}
export const getEggAddress = () => {
  return getAddress(tokens.egg.address)
}
export const getBrewAddress = () => {
  return getAddress(tokens.brew.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMasterChefPancakeSwapAddress = () => {
  return getAddress(addresses.masterChefPancakeSwap)
}
export const getMasterChefGooseAddress = () => {
  return getAddress(addresses.masterChefGoose)
}
export const getMasterChefCafeswapAddress = () => {
  return getAddress(addresses.masterChefCafeswap)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getPlantProfileAddress = () => {
  return getAddress(addresses.plantProfile)
}
export const getPlantswapFarmersAddress = () => {
  return getAddress(addresses.plantswapFarmers)
}
export const getFarmersSchoolAddress = () => {
  return getAddress(addresses.farmersSchool)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getFarmerSpecialAddress = () => {
  return getAddress(addresses.farmerSpecial)
}
// For v-1 profile
export const getPlantRabbitsAddress = () => {
  return getAddress(addresses.plantRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
