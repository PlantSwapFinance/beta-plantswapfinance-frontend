import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'

const fetchPlantswapFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAddress = getAddress(farmConfig.lpAddresses)

      let tokenAmount = null
      let quoteTokenAmount = null
      let lpTokenBalanceMasterC = null
      let lpTokenRatio = null
      let lpTotalAmount = null
      let lpTotalInQuoteToken = null
      let tokenBalanceLPVal = null
      let poolWeight = null
      let allocPoint = null

      let ReturnTokenAmount = null
      let ReturnquoteTokenAmount = null
      let ReturnlpTokenBalanceMC = null
      let ReturnlpTokenRatio = new BigNumber(1)
      let ReturnlpTotalSupply = new BigNumber(1)
      let ReturnlpTotalInQuoteToken = new BigNumber(1)
      let ReturntokenPriceVsQuote = new BigNumber(1)
      let ReturntokenBalanceLP = new BigNumber(1)
      let ReturnpoolWeight = new BigNumber(1)
      let Returnmultiplier = new BigNumber(1)

      if(farmConfig.isTokenOnly === true) {
        const calls = [
          // Balance tokens in the master chef contract
          {
            address: lpAddress,
            name: 'balanceOf',
            params: [getMasterChefAddress()],
          },
          // Total supply of tokens
          {
            address: lpAddress,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: lpAddress,
            name: 'decimals',
          },
        ]
  
        const [
          lpTokenBalanceMC,
          lpTotalSupply,
          tokenDecimals,
        ] = await multicall(erc20, calls)
  
        // Ratio in % tokens that are in staking, vs the total number in circulation
        lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
        lpTokenBalanceMasterC = new BigNumber(lpTokenBalanceMC)
        
        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(lpTokenBalanceMC).times(new BigNumber(10).pow(18))
        lpTotalAmount = new BigNumber(lpTotalSupply).times(new BigNumber(10).pow(18))

  
        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(lpTotalSupply).pow(tokenDecimals)
        quoteTokenAmount = new BigNumber(1)
  
        const [info, totalAllocPoint] = await multicall(masterchefABI, [
          {
            address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterChefAddress(),
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
      else {
        const calls = [
          // Balance of token in the LP contract
          {
            address: getAddress(farmConfig.token.address),
            name: 'balanceOf',
            params: [lpAddress],
          },
          // Balance of quote token on LP contract
          {
            address: getAddress(farmConfig.quoteToken.address),
            name: 'balanceOf',
            params: [lpAddress],
          },
          // Balance of LP tokens in the master chef contract
          {
            address: lpAddress,
            name: 'balanceOf',
            params: [getMasterChefAddress()],
          },
          // Total supply of LP tokens
          {
            address: lpAddress,
            name: 'totalSupply',
          },
          // Token decimals
          {
            address: getAddress(farmConfig.token.address),
            name: 'decimals',
          },
          // Quote token decimals
          {
            address: getAddress(farmConfig.quoteToken.address),
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
        lpTokenBalanceMasterC = new BigNumber(lpTokenBalanceMC)
  
        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(18))
          .times(new BigNumber(2))
          .times(lpTokenRatio)
  
        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        tokenBalanceLPVal = new BigNumber(tokenBalanceLP)
        quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(quoteTokenDecimals))
          .times(lpTokenRatio)
          
        lpTotalAmount = new BigNumber(lpTotalSupply).div(new BigNumber(10).pow(tokenDecimals))
  
        const [info, totalAllocPoint] = await multicall(masterchefABI, [
          {
            address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: getMasterChefAddress(),
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
        ...farmConfig,
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

export default fetchPlantswapFarms
