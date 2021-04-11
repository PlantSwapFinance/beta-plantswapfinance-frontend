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
    tokenPerBlock: '1',
  },
]

export default pools
