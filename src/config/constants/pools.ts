import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.plant,
    earningToken: tokens.plant,
    contractAddress: {
      56: '0xEe60b364586B91945a7521C025c09a5E72832f4f',
      97: '0xd6756c4876ACD3c0162AF74Ba25b6b78F951836b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: false,
    sortOrder: 1,
    tokenPerBlock: '0.003',
  },
  {
    sousId: 1,
    stakingToken: tokens.wbnb,
    earningToken: tokens.plant,
    contractAddress: {
      56: '0x6A69dDFd464427BfBf464ef270850aCCeCE25591',
      97: '0xd6756c4876ACD3c0162AF74Ba25b6b78F951836b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '0.002',
  },
  {
    sousId: 2,
    stakingToken: tokens.busd,
    earningToken: tokens.plant,
    contractAddress: {
      56: '0x6E93982FFBfD12Fa029Ededa13D96d02DB5eB130',
      97: '0xd6756c4876ACD3c0162AF74Ba25b6b78F951836b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 3,
    tokenPerBlock: '0.002',
  },
]

export default pools
