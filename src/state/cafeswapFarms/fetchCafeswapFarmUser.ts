import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefCafeswapABI from 'config/abi/masterchefCafeswap.json'
import multicall from 'utils/multicall'
import cafeswapFarmsConfig from 'config/constants/cafeswapFarms'
import { getAddress, getMasterChefCafeswapAddress } from 'utils/addressHelpers'

export const fetchCafeswapFarmUserAllowances = async (account: string) => {
  const masterChefCSAdress = getMasterChefCafeswapAddress()

  const calls = cafeswapFarmsConfig.map((cafeswapFarm) => {
    const lpContractAddress = getAddress(cafeswapFarm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefCSAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchCafeswapFarmUserTokenBalances = async (account: string) => {
  const calls = cafeswapFarmsConfig.map((cafeswapFarm) => {
    const lpContractAddress = getAddress(cafeswapFarm.lpAddresses)
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

export const fetchCafeswapFarmUserStakedBalances = async (account: string) => {
  const masterChefCSAdress = getMasterChefCafeswapAddress()

  const calls = cafeswapFarmsConfig.map((cafeswapFarm) => {
    return {
      address: masterChefCSAdress,
      name: 'userInfo',
      params: [cafeswapFarm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefCafeswapABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchCafeswapFarmUserEarnings = async (account: string) => {
  const masterChefCSAdress = getMasterChefCafeswapAddress()

  const calls = cafeswapFarmsConfig.map((cafeswapFarm) => {
    return {
      address: masterChefCSAdress,
      name: 'pendingCake',
      params: [cafeswapFarm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefCafeswapABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
