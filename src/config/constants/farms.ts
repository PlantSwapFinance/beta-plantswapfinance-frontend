import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [

  {
    pid: 3,
    lpSymbol: 'PLANT-BNB LP',
    lpAddresses: {
      97: '0xcba2850439ccb4228906b886d45f96063b7e26f3',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    token: tokens.plant,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'PLANT-BUSD LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    token: tokens.plant,
    quoteToken: tokens.busd,
  },
  {
    pid: 5,
    lpSymbol: 'PLANT-DAI LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    token: tokens.plant,
    quoteToken: tokens.dai,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
]

export default farms
