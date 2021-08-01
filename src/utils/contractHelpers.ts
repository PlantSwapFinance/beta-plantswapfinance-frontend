import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { verticalGardensConfig, poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getPlantProfileAddress,
  getPlantswapGardenersAddress,
  getGardeningSchoolAddress,
  getPlantAddress,
  getCakeAddress,
  getEggAddress,
  getBrewAddress,
  getMasterChefAddress,
  getMasterChefPancakeSwapAddress,
  getMasterChefGooseAddress,
  getMasterChefCafeswapAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/plantswapGardenersProfile.json'
import plantswapGardenersAbi from 'config/abi/plantswapGardeners.json'
import gardeningSchoolAbi from 'config/abi/gardeningSchool.json'
import bep20Abi from 'config/abi/erc20.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import plantAbi from 'config/abi/plant.json'
import cakeAbi from 'config/abi/cake.json'
import eggAbi from 'config/abi/egg.json'
import brewAbi from 'config/abi/brew.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import masterChef from 'config/abi/masterchef.json'
import verticalGardens from 'config/abi/verticalGardens.json'
import masterchefPancakeSwap from 'config/abi/masterchefPancakeSwap.json'
import masterchefGoose from 'config/abi/masterchefGoose.json'
import masterchefCafeswap from 'config/abi/masterchefCafeswap.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getPlantContract = (web3?: Web3) => {
  return getContract(plantAbi, getPlantAddress(), web3)
}
export const getCakeContract = (web3?: Web3) => {
  return getContract(cakeAbi, getCakeAddress(), web3)
}
export const getEggContract = (web3?: Web3) => {
  return getContract(eggAbi, getEggAddress(), web3)
}
export const getBrewContract = (web3?: Web3) => {
  return getContract(brewAbi, getBrewAddress(), web3)
}
export const getPlantswapGardenersContract = (web3?: Web3) => {
  return getContract(plantswapGardenersAbi, getPlantswapGardenersAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getPlantProfileAddress(), web3)
}
export const getGardeningSchoolContract = (web3?: Web3) => {
  return getContract(gardeningSchoolAbi, getGardeningSchoolAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getVerticalGardenContract = (id: number, web3?: Web3) => {
  const config = verticalGardensConfig.find((verticalGarden) => verticalGarden.vgId === id)
  const abi = verticalGardens
  return getContract(abi, getAddress(config.verticalGardenContractAddress), web3)
}
export const getMasterchefPancakeSwapContract = (web3?: Web3) => {
  return getContract(masterchefPancakeSwap, getMasterChefPancakeSwapAddress(), web3)
}
export const getMasterchefGooseContract = (web3?: Web3) => {
  return getContract(masterchefGoose, getMasterChefGooseAddress(), web3)
}
export const getMasterchefCafeswapContract = (web3?: Web3) => {
  return getContract(masterchefCafeswap, getMasterChefCafeswapAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
