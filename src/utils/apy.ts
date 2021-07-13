import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, PLANT_PER_BLOCK, CAKE_PER_BLOCK, EGG_PER_BLOCK } from 'config'

/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new plant allocated to the pool for each new block
 * @returns Null if the APY is NaN or infinite.
 */
export const getPoolApy = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param plantPriceUsd Plant price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApy = (poolWeight: BigNumber, plantPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyPlantRewardAllocation = PLANT_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyPlantRewardAllocation.times(plantPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param plantPriceUsd Plant price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
 export const getGardenApy = (poolWeight: BigNumber, plantPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyPlantRewardAllocation = PLANT_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyPlantRewardAllocation.times(plantPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get barn APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param plantPriceUsd Plant price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
 export const getBarnBetaApy = (poolWeight: BigNumber, plantPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyPlantRewardAllocation = PLANT_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyPlantRewardAllocation.times(plantPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}


/**
 * Get pancakeSwapFarm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
 export const getPancakeswapFarmApy = (poolWeight: BigNumber, cakePriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get gooseFarm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param eggPriceUsd Egg price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
 export const getGooseFarmApy = (poolWeight: BigNumber, eggPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyEggRewardAllocation = EGG_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyEggRewardAllocation.times(eggPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get gooseFarm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param brewPriceUsd Egg price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
 export const getCafeswapFarmApy = (poolWeight: BigNumber, brewPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyBrewRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyBrewRewardAllocation.times(brewPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}


export default null
