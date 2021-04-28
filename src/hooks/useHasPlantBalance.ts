import BigNumber from 'bignumber.js'
import { getPlantAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's PLANT balance is at least the amount passed in
 */
const useHasPlantBalance = (minimumBalance: BigNumber) => {
  const plantBalance = useTokenBalance(getPlantAddress())
  return plantBalance.gte(minimumBalance)
}

export default useHasPlantBalance
