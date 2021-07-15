import verticalGardensConfig from 'config/constants/verticalGardens'
import verticalGardenABI from 'config/abi/verticalGardens.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const listVerticalGardens = verticalGardensConfig.filter((p) => p.vgId !== 0)

export const fetchVerticalGardensAllowance = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.verticalGardenContractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({ ...acc, [verticalGarden.vgId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchVerticalGardensRewardAllowance = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.stakingRewardToken.address),
    name: 'allowance',
    params: [account, getAddress(p.verticalGardenContractAddress)],
  }))

  const allowancesReward = await multicall(erc20ABI, calls)
  return listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({ ...acc, [verticalGarden.vgId]: new BigNumber(allowancesReward[index]).toJSON() }),
    {},
  )
}

export const fetchVerticalGardensAllowancePlant = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.verticalEarningToken.address),
    name: 'allowance',
    params: [account, getAddress(p.verticalGardenContractAddress)],
  }))

  const allowancesPlant = await multicall(erc20ABI, calls)
  return listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({ ...acc, [verticalGarden.vgId]: new BigNumber(allowancesPlant[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB verticalGardens
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({ ...acc, [verticalGarden.vgId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.verticalGardenContractAddress),
    name: 'gardeners',
    params: [account],
  }))
  const gardeners = await multicall(verticalGardenABI, calls)
  const stakedBalances = listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({...acc, [verticalGarden.vgId]: new BigNumber(gardeners[index][0]._hex).toJSON(), }),
    {},
  )

  return { ...stakedBalances }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.verticalGardenContractAddress),
    name: 'pendingRewardToken',
    params: [account],
  }))
  const res = await multicall(verticalGardenABI, calls)
  const pendingRewards = listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({
      ...acc,
      [verticalGarden.vgId]: new BigNumber(res[index][0]._hex).toJSON(),
    }),
    {},
  )

  return { ...pendingRewards }
}

export const fetchUserPendingPlantRewards = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.verticalGardenContractAddress),
    name: 'pendingPlantReward',
    params: [account],
  }))
  const res = await multicall(verticalGardenABI, calls)
  const pendingPlantRewards = listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({
      ...acc,
      [verticalGarden.vgId]: new BigNumber(res[index][0]._hex).toJSON(),
    }),
    {},
  )

  return { ...pendingPlantRewards }
}

export const fetchUserHarvestedRewards = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.verticalGardenContractAddress),
    name: 'harvestedReward',
    params: [account],
  }))
  const res = await multicall(verticalGardenABI, calls)
  const harvestedRewards = listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({
      ...acc,
      [verticalGarden.vgId]: new BigNumber(res[index][0]._hex).toJSON(),
    }),
    {},
  )

  return { ...harvestedRewards }
}

export const fetchUserHarvestedPlants = async (account) => {
  const calls = listVerticalGardens.map((p) => ({
    address: getAddress(p.verticalGardenContractAddress),
    name: 'harvestedPlant',
    params: [account],
  }))
  const res = await multicall(verticalGardenABI, calls)
  const harvestedPlants = listVerticalGardens.reduce(
    (acc, verticalGarden, index) => ({
      ...acc,
      [verticalGarden.vgId]: new BigNumber(res[index][0]._hex).toJSON(),
    }),
    {},
  )

  return { ...harvestedPlants }
}