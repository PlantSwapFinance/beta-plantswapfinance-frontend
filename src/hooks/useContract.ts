import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getPlantContract,
  getFarmersSchoolContract,
  getFarmerSpecialContract,
  getPlantRabbitContract,
  getProfileContract,
  getIfoContract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getMasterchefPancakeSwapContract,
  getMasterchefGooseContract,
  getMasterchefCafeswapContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoContract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const usePlant = () => {
  const web3 = useWeb3()
  return useMemo(() => getPlantContract(web3), [web3])
}

export const useFarmersSchool = () => {
  const web3 = useWeb3()
  return useMemo(() => getFarmersSchoolContract(web3), [web3])
}

export const usePlantswapFarmers = () => {
  const web3 = useWeb3()
  return useMemo(() => getPlantRabbitContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useMasterchefPancakeSwap = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefPancakeSwapContract(web3), [web3])
}

export const useMasterchefGoose = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefGooseContract(web3), [web3])
}

export const useMasterchefCafeswap = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefCafeswapContract(web3), [web3])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const useFarmerSpecialContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getFarmerSpecialContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}
