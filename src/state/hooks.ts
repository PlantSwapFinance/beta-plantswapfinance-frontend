import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from '@plantswap-libs/uikit'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import { getWeb3NoAccount } from 'utils/web3'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchBarnsBetaPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchPancakeSwapFarmsPublicDataAsync,
  fetchGooseFarmsPublicDataAsync,
  fetchCafeswapFarmsPublicDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
  setBlock,
} from './actions'
import { State, Farm, BarnBeta, PancakeSwapFarm, GooseFarm, CafeswapFarm, Pool, ProfileState, TeamsState, AchievementState, PriceState } from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchPrices } from './prices'

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

export const useFetchPancakeSwapPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchPancakeSwapFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

export const useFetchGoosePublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchGooseFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

export const useFetchCafeswapPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchCafeswapFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Barn beta
export const useFetchBarnsBetaPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchBarnsBetaPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}


// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// BarnsBeta

export const useBarnsBeta = (): BarnBeta[] => {
  const barnsBeta = useSelector((state: State) => state.barnsBeta.data)
  return barnsBeta
}

export const useBarnBetaFromPid = (pid): BarnBeta => {
  const barnBeta = useSelector((state: State) => state.barnsBeta.data.find((f) => f.pid === pid))
  return barnBeta
}

export const useBarnBetaFromSymbol = (lpSymbol: string): BarnBeta => {
  const barnBeta = useSelector((state: State) => state.barnsBeta.data.find((f) => f.lpSymbol === lpSymbol))
  return barnBeta
}

export const useBarnBetaUser = (pid) => {
  const barnBeta = useBarnBetaFromPid(pid)

  return {
    allowance: barnBeta.userData ? new BigNumber(barnBeta.userData.allowance) : new BigNumber(0),
    tokenBalance: barnBeta.userData ? new BigNumber(barnBeta.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: barnBeta.userData ? new BigNumber(barnBeta.userData.stakedBalance) : new BigNumber(0),
    earnings: barnBeta.userData ? new BigNumber(barnBeta.userData.earnings) : new BigNumber(0),
  }
}


// External Farms

export const usePancakeSwapFarms = (): PancakeSwapFarm[] => {
  const pancakeSwapFarms = useSelector((state: State) => state.pancakeSwapFarms.data)
  return pancakeSwapFarms
}

export const usePancakeSwapFarmFromPid = (pid): PancakeSwapFarm => {
  const pancakeSwapFarm = useSelector((state: State) => state.pancakeSwapFarms.data.find((f) => f.pid === pid))
  return pancakeSwapFarm
}

export const usePancakeSwapFarmFromSymbol = (lpSymbol: string): PancakeSwapFarm => {
  const pancakeSwapFarm = useSelector((state: State) => state.pancakeSwapFarms.data.find((f) => f.lpSymbol === lpSymbol))
  return pancakeSwapFarm
}

export const usePancakeSwapFarmUser = (pid) => {
  const pancakeSwapFarm = usePancakeSwapFarmFromPid(pid)

  return {
    allowance: pancakeSwapFarm.userData ? new BigNumber(pancakeSwapFarm.userData.allowance) : new BigNumber(0),
    tokenBalance: pancakeSwapFarm.userData ? new BigNumber(pancakeSwapFarm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: pancakeSwapFarm.userData ? new BigNumber(pancakeSwapFarm.userData.stakedBalance) : new BigNumber(0),
    earnings: pancakeSwapFarm.userData ? new BigNumber(pancakeSwapFarm.userData.earnings) : new BigNumber(0),
  }
}

export const useGooseFarms = (): GooseFarm[] => {
  const gooseFarms = useSelector((state: State) => state.gooseFarms.data)
  return gooseFarms
}

export const useGooseFarmFromPid = (pid): GooseFarm => {
  const gooseFarm = useSelector((state: State) => state.gooseFarms.data.find((f) => f.pid === pid))
  return gooseFarm
}

export const useGooseFarmFromSymbol = (lpSymbol: string): GooseFarm => {
  const gooseFarm = useSelector((state: State) => state.gooseFarms.data.find((f) => f.lpSymbol === lpSymbol))
  return gooseFarm
}

export const useGooseFarmUser = (pid) => {
  const gooseFarm = useGooseFarmFromPid(pid)

  return {
    allowance: gooseFarm.userData ? new BigNumber(gooseFarm.userData.allowance) : new BigNumber(0),
    tokenBalance: gooseFarm.userData ? new BigNumber(gooseFarm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: gooseFarm.userData ? new BigNumber(gooseFarm.userData.stakedBalance) : new BigNumber(0),
    earnings: gooseFarm.userData ? new BigNumber(gooseFarm.userData.earnings) : new BigNumber(0),
  }
}

export const useCafeswapFarms = (): CafeswapFarm[] => {
  const cafeswapFarms = useSelector((state: State) => state.cafeswapFarms.data)
  return cafeswapFarms
}

export const useCafeswapFarmFromPid = (pid): CafeswapFarm => {
  const cafeswapFarm = useSelector((state: State) => state.cafeswapFarms.data.find((f) => f.pid === pid))
  return cafeswapFarm
}

export const useCafeswapFarmFromSymbol = (lpSymbol: string): CafeswapFarm => {
  const cafeswapFarm = useSelector((state: State) => state.cafeswapFarms.data.find((f) => f.lpSymbol === lpSymbol))
  return cafeswapFarm
}

export const useCafeswapFarmUser = (pid) => {
  const cafeswapFarm = useCafeswapFarmFromPid(pid)

  return {
    allowance: cafeswapFarm.userData ? new BigNumber(cafeswapFarm.userData.allowance) : new BigNumber(0),
    tokenBalance: cafeswapFarm.userData ? new BigNumber(cafeswapFarm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: cafeswapFarm.userData ? new BigNumber(cafeswapFarm.userData.stakedBalance) : new BigNumber(0),
    earnings: cafeswapFarm.userData ? new BigNumber(cafeswapFarm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch, slowRefresh])
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[token.toLowerCase()]
}

export const usePricePlantBusd = (): BigNumber => {
  const ZERO = new BigNumber(0)

  const plantBnbFarm = useFarmFromPid(4)
  
  const bnbBusdPancakeSwapFarm = usePancakeSwapFarmFromPid(2)
  
  const bnbBusdPrice = bnbBusdPancakeSwapFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdPancakeSwapFarm.tokenPriceVsQuote) : ZERO
  const plantBusdPrice = plantBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(plantBnbFarm.tokenPriceVsQuote) : ZERO

  return plantBusdPrice
}

export const usePriceCakeBusd = (): BigNumber => {
  const ZERO = new BigNumber(0)

  const cakeBnbFarm = usePancakeSwapFarmFromPid(251)
  
  const bnbBusdPancakeSwapFarm = usePancakeSwapFarmFromPid(252)
  
  const bnbBusdPrice = bnbBusdPancakeSwapFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdPancakeSwapFarm.tokenPriceVsQuote) : ZERO
  const cakeBusdPrice = cakeBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(cakeBnbFarm.tokenPriceVsQuote) : ZERO

  return cakeBusdPrice
}


export const usePriceEggBusd = (): BigNumber => {
  const ZERO = new BigNumber(0)

  const eggBnbFarm = useGooseFarmFromPid(1)
  
  const bnbBusdGooseFarm = useGooseFarmFromPid(0)
  
  const bnbBusdPrice = bnbBusdGooseFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdGooseFarm.tokenPriceVsQuote) : ZERO
  const eggBusdPrice = eggBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(eggBnbFarm.tokenPriceVsQuote) : ZERO

  return eggBusdPrice
}

export const usePriceBrewBusd = (): BigNumber => {
  const ZERO = new BigNumber(0)

  const brewBnbFarm = useCafeswapFarmFromPid(1)
  
  const bnbBusdCafeswapFarm = useCafeswapFarmFromPid(0)
  
  const bnbBusdPrice = bnbBusdCafeswapFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdCafeswapFarm.tokenPriceVsQuote) : ZERO
  const brewBusdPrice = brewBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(brewBnbFarm.tokenPriceVsQuote) : ZERO

  return brewBusdPrice
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
