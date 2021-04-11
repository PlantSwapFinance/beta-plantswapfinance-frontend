import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 86,
    stakingToken: tokens.plant,
    earningToken: tokens.plant,
    contractAddress: {
      56: '0x58BA5Bd8872ec18BD360a9592149daed2fC57c69',
      97: '0xFe5Ab583d91fa90549aC61666CF1C4e2CeA5187e',
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
