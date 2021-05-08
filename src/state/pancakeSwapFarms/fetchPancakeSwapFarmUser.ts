import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefPancakeSwapABI from 'config/abi/masterchefPancakeSwap.json'
import multicall from 'utils/multicall'
import pancakeSwapFarmsConfig from 'config/constants/pancakeSwapFarms'
import { getAddress, getMasterChefPancakeSwapAddress } from 'utils/addressHelpers'

export const fetchPancakeSwapFarmUserAllowances = async (account: string) => {
  const masterChefPCSAdress = getMasterChefPancakeSwapAddress()

  const calls = pancakeSwapFarmsConfig.map((pancakeSwapFarm) => {
    const lpContractAddress = getAddress(pancakeSwapFarm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefPCSAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchPancakeSwapFarmUserTokenBalances = async (account: string) => {
  const calls = pancakeSwapFarmsConfig.map((pancakeSwapFarm) => {
    const lpContractAddress = getAddress(pancakeSwapFarm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchPancakeSwapFarmUserStakedBalances = async (account: string) => {
  const masterChefPCSAdress = getMasterChefPancakeSwapAddress()

  const calls = pancakeSwapFarmsConfig.map((pancakeSwapFarm) => {
    return {
      address: masterChefPCSAdress,
      name: 'userInfo',
      params: [pancakeSwapFarm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefPancakeSwapABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchPancakeSwapFarmUserEarnings = async (account: string) => {
  const masterChefPCSAdress = getMasterChefPancakeSwapAddress()

  const calls = pancakeSwapFarmsConfig.map((pancakeSwapFarm) => {
    return {
      address: masterChefPCSAdress,
      name: 'pendingCake',
      params: [pancakeSwapFarm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefPancakeSwapABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
