import tokens from './tokens'
import contracts from './contracts'
import { BarnBetaConfig } from './types'

// INDEX

// Plantswap: Line 20:145
// Pancakeswap: Line 150:+











const barnsBeta: BarnBetaConfig[] = [
  // Plantswap START
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 0,
    risk: 5,
    lpSymbol: 'PLANT',
    lpAddresses: tokens.plant.address,
    isTokenOnly: true,
    token: tokens.plant,
    quoteToken: tokens.plant,
  },
  // New V2
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 4,
    risk: 5,
    lpSymbol: 'PLANT-BNB LP V2',
    lpAddresses: {
      97: '',
      56: '0x79268898de0f8c67ad73d9e33534d9874411aaaa',
    },
    token: tokens.plant,
    quoteToken: tokens.wbnb,
  },
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 5,
    risk: 5,
    lpSymbol: 'PLANT-BUSD LP V2',
    lpAddresses: {
      97: '',
      56: '0xdf638da5adff2c7fdb2ce0fbbfa15813fa113aaa',
    },
    token: tokens.plant,
    quoteToken: tokens.busd,
  },
  // V1 (Not to use anymore)
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 1,
    risk: 5,
    lpSymbol: 'PLANT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xd0dc9cc35ed1584f4858e5194bd9b153b70b8a83',
    },
    token: tokens.plant,
    quoteToken: tokens.wbnb,
  },
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 3,
    risk: 5,
    lpSymbol: 'PLANT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xf71070df7c352a2668266703dc5d3d539d336bb0',
    },
    token: tokens.plant,
    quoteToken: tokens.busd,
  },
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 7,
    risk: 3,
    lpSymbol: 'BUSD',
    lpAddresses: tokens.busd.address,
    isTokenOnly: true,
    token: tokens.busd,
    quoteToken: tokens.busd,
  },
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 9,
    risk: 2,
    lpSymbol: 'USDC',
    lpAddresses: tokens.usdc.address,
    isTokenOnly: true,
    token: tokens.usdc,
    quoteToken: tokens.usdc,
  },
  {
    chefTag: 'Plantswap',
    chefAddess: contracts.masterChef,
    chefAbi: 'mastergardener',
    pid: 10,
    risk: 3,
    lpSymbol: 'CAKE',
    lpAddresses: tokens.cake.address,
    isTokenOnly: true,
    token: tokens.cake,
    quoteToken: tokens.cake,
  },
  
  // Plantswap END




















  // Pancakeswap START
/*
  {
    chefTag: 'Pancakeswap',
    chefAddess: contracts.masterChefPancakeSwap,
    chefAbi: 'masterchefPancakeSwap',
    pid: 251,
    risk: 5,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    chefTag: 'Pancakeswap',
    chefAddess: contracts.masterChefPancakeSwap,
    chefAbi: 'masterchefPancakeSwap',
    pid: 252,
    risk: 5,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    chefTag: 'Pancakeswap',
    chefAddess: contracts.masterChefPancakeSwap,
    chefAbi: 'masterchefPancakeSwap',
    pid: 139,
    risk: 5,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xFB7E9FE9D13561AdA7131Fa746942a14F7dd4Cf6',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    chefTag: 'Pancakeswap',
    chefAddess: contracts.masterChefPancakeSwap,
    chefAbi: 'masterchefPancakeSwap',
    pid: 140,
    risk: 5,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x9bdEdb0c876fC0Da79D945DF28942b898Af89Fc7',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  //
  // All farms below here are from v1 and are to be set to 0x
  //
  {
    chefTag: 'Pancakeswap',
    chefAddess: contracts.masterChefPancakeSwap,
    chefAbi: 'masterchefPancakeSwap',
    pid: 1,
    risk: 5,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    chefTag: 'Pancakeswap',
    chefAddess: contracts.masterChefPancakeSwap,
    chefAbi: 'masterchefPancakeSwap',
    pid: 2,
    risk: 5,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  }, */



  
  // Plantswap END
]

export default barnsBeta
