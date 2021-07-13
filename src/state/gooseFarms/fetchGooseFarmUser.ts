import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefGooseABI from 'config/abi/masterchefGoose.json'
import multicall from 'utils/multicall'
import gooseFarmsConfig from 'config/constants/gooseFarms'
import { getAddress, getMasterChefGooseAddress } from 'utils/addressHelpers'

export const fetchGooseFarmUserAllowances = async (account: string) => {
  const masterChefGooseAdress = getMasterChefGooseAddress()

  const calls = gooseFarmsConfig.map((gooseFarm) => {
    const lpContractAddress = getAddress(gooseFarm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefGooseAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchGooseFarmUserTokenBalances = async (account: string) => {
  const calls = gooseFarmsConfig.map((gooseFarm) => {
    const lpContractAddress = getAddress(gooseFarm.lpAddresses)
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

export const fetchGooseFarmUserStakedBalances = async (account: string) => {
  const masterChefGooseAdress = getMasterChefGooseAddress()

  const calls = gooseFarmsConfig.map((gooseFarm) => {
    return {
      address: masterChefGooseAdress,
      name: 'userInfo',
      params: [gooseFarm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefGooseABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchGooseFarmUserEarnings = async (account: string) => {
  const masterChefGooseAdress = getMasterChefGooseAddress()

  const calls = gooseFarmsConfig.map((gooseFarm) => {
    return {
      address: masterChefGooseAdress,
      name: 'pendingEgg',
      params: [gooseFarm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefGooseABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
