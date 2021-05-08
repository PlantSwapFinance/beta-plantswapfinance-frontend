import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefCafeswapABI from 'config/abi/masterchefCafeswap.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefCafeswapAddress } from 'utils/addressHelpers'
import cafeswapFarmsConfig from 'config/constants/cafeswapFarms'

const fetchCafeswapFarms = async () => {
  const data = await Promise.all(
    cafeswapFarmsConfig.map(async (cafeswapFarmConfig) => {
      const lpAddress = getAddress(cafeswapFarmConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(cafeswapFarmConfig.token.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(cafeswapFarmConfig.quoteToken.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [getMasterChefCafeswapAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(cafeswapFarmConfig.token.address),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(cafeswapFarmConfig.quoteToken.address),
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

      const [info, totalAllocPoint] = await multicall(masterchefCafeswapABI, [
        {
          address: getMasterChefCafeswapAddress(),
          name: 'poolInfo',
          params: [cafeswapFarmConfig.pid],
        },
        {
          address: getMasterChefCafeswapAddress(),
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...cafeswapFarmConfig,
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

export default fetchCafeswapFarms
