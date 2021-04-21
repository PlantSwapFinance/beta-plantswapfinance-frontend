import { usePriceCakeBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const plantPriceBusd = usePriceCakeBusd()

  return totalCake * plantPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
