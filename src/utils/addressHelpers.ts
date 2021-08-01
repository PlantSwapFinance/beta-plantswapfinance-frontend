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
export const getPlantProfileAddress = () => {
  return getAddress(addresses.plantswapGardenersProfile)
}
export const getPlantswapGardenersAddress = () => {
  return getAddress(addresses.plantswapGardeners)
}
export const getGardeningSchoolAddress = () => {
  return getAddress(addresses.gardeningSchool)
}
// Not use
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
