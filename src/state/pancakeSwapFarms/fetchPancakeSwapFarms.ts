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
      
      
      let tokenAmount = new BigNumber(1)
      let quoteTokenAmount = new BigNumber(1)
      let lpTokenBalanceMasterC = new BigNumber(1)
      let lpTokenRatio = new BigNumber(1)
      let lpTotalAmount = new BigNumber(1)
      let lpTotalInQuoteToken = new BigNumber(1)
      const tokenBalanceLPVal = new BigNumber(1)
      let poolWeight = new BigNumber(1)
      let allocPoint = new BigNumber(1)

      let ReturnTokenAmount = new BigNumber(1)
      let ReturnquoteTokenAmount = new BigNumber(1)
      let ReturnlpTokenBalanceMC = new BigNumber(1)
      let ReturnlpTokenRatio = new BigNumber(1)
      let ReturnlpTotalSupply = new BigNumber(1)
      let ReturnlpTotalInQuoteToken = new BigNumber(1)
      let ReturntokenPriceVsQuote = new BigNumber(1)
      let ReturntokenBalanceLP = new BigNumber(1)
      let ReturnpoolWeight = new BigNumber(1)
      let Returnmultiplier = new BigNumber(1)

      if(pancakeSwapFarmConfig.isTokenOnly === true) {
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
        lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(18))
        lpTotalAmount = new BigNumber(lpTotalSupply)
      //  lpTotalAmount = new BigNumber(lpTotalSupply)
  
        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(lpTokenRatio)
        lpTokenBalanceMasterC = new BigNumber(lpTokenBalanceMC)
  
     /*   const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(18))
          .times(new BigNumber(2))
          .times(lpTokenRatio)
        */
  
        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
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
  
        allocPoint = new BigNumber(info.allocPoint._hex)
        poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

        ReturnTokenAmount = tokenAmount
        ReturnquoteTokenAmount = quoteTokenAmount
        ReturnlpTokenBalanceMC = lpTokenBalanceMasterC  // not in fetchGarden...
        ReturnlpTokenRatio = lpTokenRatio  // not in fetchGarden...
        ReturnlpTotalSupply = lpTotalAmount  // not in fetchGarden...
        ReturnlpTotalInQuoteToken = lpTotalInQuoteToken
        ReturntokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
        ReturntokenBalanceLP = tokenBalanceLPVal  // not in fetchGarden...
        ReturnpoolWeight = poolWeight
        Returnmultiplier = allocPoint.div(10)
      }
      else
      {
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
        lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
        lpTotalAmount = new BigNumber(lpTotalSupply)

        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(18))
          .times(new BigNumber(2))
          .times(lpTokenRatio)
        lpTokenBalanceMasterC = new BigNumber(lpTokenBalanceMC)

        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
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

        allocPoint = new BigNumber(info.allocPoint._hex)
        poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

        
        ReturnTokenAmount = tokenAmount
        ReturnquoteTokenAmount = quoteTokenAmount
        ReturnlpTokenBalanceMC = lpTokenBalanceMasterC
        ReturnlpTokenRatio = lpTokenRatio
        ReturnlpTotalSupply = lpTotalAmount
        ReturnlpTotalInQuoteToken = lpTotalInQuoteToken
        ReturntokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
        ReturntokenBalanceLP = tokenBalanceLPVal
        ReturnpoolWeight = poolWeight
        Returnmultiplier = allocPoint.div(100)
      }
      return {
        ...pancakeSwapFarmConfig,
        tokenAmount: ReturnTokenAmount.toJSON(),
        quoteTokenAmount: ReturnquoteTokenAmount.toJSON(),
        lpTokenBalanceMC: ReturnlpTokenBalanceMC.toJSON(),
        lpTokenRatio: ReturnlpTokenRatio.toJSON(),
        lpTotalSupply: ReturnlpTotalSupply.toJSON(),
        lpTotalInQuoteToken: ReturnlpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: ReturntokenPriceVsQuote.toJSON(),
        tokenBalanceLP: ReturntokenBalanceLP.toJSON(),
        poolWeight: ReturnpoolWeight.toJSON(),
        multiplier: `${Returnmultiplier.toString()}X`,
      }
    }),
  )
  return data
}

export default fetchPancakeSwapFarms
