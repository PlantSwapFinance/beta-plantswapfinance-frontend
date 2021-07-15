import tokens from './tokens'
import { VerticalGardenConfig, VerticalGardenCategory } from './types'

const verticalGardens: VerticalGardenConfig[] = [
  
  {
    vgId: 1,
    stakingToken: tokens.cake,
    stakingRewardToken: tokens.cake,
    verticalEarningToken: tokens.plant,
    verticalGardenContractAddress: {
      56: '0x0B1448cD157197E7Fb7F3deb19CbFB2988FB2911',
      97: '',
    },
    verticalGardenMasterGardenerPId: 16,
    verticalGardenCategory: VerticalGardenCategory.PANCAKE,
    harvest: true,
    sortOrder: 1,
    isFinished: false,
    depositFee: 100, // 1%
    rewardCut: 1500, // 15%
    rewardCutSplitDevelopmentFund: 50, // 50% of 15%
    rewardCutSplitBuyPlantAndBurn: 50, // 50% of 15%
  },
]

export default verticalGardens
