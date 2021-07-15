import tokens from './tokens'
import { VerticalGardenConfig, VerticalGardenCategory } from './types'

const verticalGardens: VerticalGardenConfig[] = [
  
  {
    vgId: 1,
    stakingToken: tokens.cake,
    stakingRewardToken: tokens.cake,
    verticalEarningToken: tokens.plant,
    verticalGardenContractAddress: {
      56: '0xBCb7b63B90459D536200Eb73f5b4D746da52A411',
      97: '',
    },
    verticalGardenMasterGardenerPId: 17,
    verticalGardenCategory: VerticalGardenCategory.PANCAKE,
    harvest: true,
    sortOrder: 1,
    isFinished: false,
    depositFee: 100, // 1%
    rewardCut: 1500, // 15%
    rewardCutSplitDevelopmentFund: 50, // 50% of 15%
    rewardCutSplitBuyPlantAndBurn: 50, // 50% of 15%
  },
  {
    vgId: 2,
    stakingToken: tokens.cake,
    stakingRewardToken: tokens.oddz,
    verticalEarningToken: tokens.plant,
    verticalGardenContractAddress: {
      56: '0x32121B2a1eD671dd0F1FC28Fffb5F1500b08A327',
      97: '',
    },
    verticalGardenMasterGardenerPId: 18,
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
