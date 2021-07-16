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
    verticalGardenMasterGardenerPId: 18,
    verticalGardenMasterGardenerAllocPt: 60,
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
    verticalGardenMasterGardenerPId: 19,
    verticalGardenMasterGardenerAllocPt: 30,
    verticalGardenCategory: VerticalGardenCategory.PANCAKE,
    harvest: true,
    sortOrder: 2,
    isFinished: false,
    depositFee: 100, // 1%
    rewardCut: 1500, // 15%
    rewardCutSplitDevelopmentFund: 50, // 50% of 15%
    rewardCutSplitBuyPlantAndBurn: 50, // 50% of 15%
  },
  {
    vgId: 4,
    stakingToken: tokens.brew,
    stakingRewardToken: tokens.brew,
    verticalEarningToken: tokens.plant,
    verticalGardenContractAddress: {
      56: '0xE7F2a4EAaFf2532DA98dC8d987D7C19B6803Fcac',
      97: '',
    },
    verticalGardenMasterGardenerPId: 21,
    verticalGardenMasterGardenerAllocPt: 0,
    verticalGardenCategory: VerticalGardenCategory.CAFE,
    harvest: true,
    sortOrder: 4,
    isFinished: false,
    depositFee: 100, // 1%
    rewardCut: 1500, // 15%
    rewardCutSplitDevelopmentFund: 50, // 50% of 15%
    rewardCutSplitBuyPlantAndBurn: 50, // 50% of 15%
  },
   
]

export default verticalGardens
