import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 86,
    stakingToken: tokens.plant,
    earningToken: tokens.plant,
    contractAddress: {
      97: '0xD353738494c18d779E8279507032493e60603199',
      56: '0x35418e14F5aA615C4f020eFBa6e01C5DbF15AdD2',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 1,
    tokenPerBlock: '2.3148',
  },
  {
    sousId: 0,
    stakingToken: tokens.cake,
    earningToken: tokens.cake,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
