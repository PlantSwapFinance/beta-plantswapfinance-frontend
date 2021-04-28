import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  
  {
    pid: 0,
    lpSymbol: 'PLANT',
    lpAddresses: {
      97: '0xFe5Ab583d91fa90549aC61666CF1C4e2CeA5187e',
      56: '0x58BA5Bd8872ec18BD360a9592149daed2fC57c69',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  // New V2
  {
    pid: 4,
    lpSymbol: 'PLANT-BNB LP V2',
    lpAddresses: {
      97: '',
      56: '0x79268898de0f8c67ad73d9e33534d9874411aaaa',
    },
    token: tokens.plant,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 5,
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
    pid: 1,
    lpSymbol: 'PLANT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xd0dc9cc35ed1584f4858e5194bd9b153b70b8a83',
    },
    token: tokens.plant,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'PLANT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xf71070df7c352a2668266703dc5d3d539d336bb0',
    },
    token: tokens.plant,
    quoteToken: tokens.busd,
  },
]

export default farms
