import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefPancakeSwapABI from 'config/abi/masterchefPancakeSwap.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefPancakeSwapAddress } from 'utils/addressHelpers'
import pancakeSwapFarmsConfig from 'config/constants/pancakeSwapFarms'

const fetchPancakeSwapFarms = async () => {
  const data = await Promise.all(
    pancakeSwapFarmsConfig.map(async (pancakeSwapFarmConfig) => {
      const lpAddress = getAddress(pancakeSwapFarmConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(pancakeSwapFarmConfig.token.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(pancakeSwapFarmConfig.quoteToken.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [getMasterChefPancakeSwapAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(pancakeSwapFarmConfig.token.address),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(pancakeSwapFarmConfig.quoteToken.address),
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)

      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteTokenDecimals))
        .times(lpTokenRatio)

      const [info, totalAllocPoint] = await multicall(masterchefPancakeSwapABI, [
        {
          address: getMasterChefPancakeSwapAddress(),
          name: 'poolInfo',
          params: [pancakeSwapFarmConfig.pid],
        },
        {
          address: getMasterChefPancakeSwapAddress(),
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...pancakeSwapFarmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
      }
    }),
  )
  return data
}

export default fetchPancakeSwapFarms
