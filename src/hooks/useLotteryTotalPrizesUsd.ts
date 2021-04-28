import { usePricePlantBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalPlant = getBalanceNumber(totalRewards)
  const plantPriceBusd = usePricePlantBusd()

  return totalPlant * plantPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
