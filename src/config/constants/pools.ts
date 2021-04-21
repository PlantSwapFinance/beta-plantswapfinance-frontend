import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 86,
    stakingToken: tokens.plant,
    earningToken: tokens.plant,
    contractAddress: {
      56: '0x58BA5Bd8872ec18BD360a9592149daed2fC57c69',
      97: '0xd6756c4876ACD3c0162AF74Ba25b6b78F951836b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 1,
    tokenPerBlock: '0.01',
  },
]

export default pools
