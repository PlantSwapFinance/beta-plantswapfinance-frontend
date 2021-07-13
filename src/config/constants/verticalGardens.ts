import tokens from './tokens'
import { VerticalGardenConfig, VerticalGardenCategory } from './types'

const verticalGardens: VerticalGardenConfig[] = [
  {
    vgId: 1,  // pid MasterGardener: 13
    stakingToken: tokens.cake,
    stakingRewardToken: tokens.cake,
    verticalEarningToken: tokens.plant,
    verticalGardenContractAddress: {
      56: '0x283C9a6E48FdEAf4f5d875D4b54BEe8491c30672',
      97: '',
    },
    verticalGardenMasterGardenerPId: 13,
    verticalGardenCategory: VerticalGardenCategory.PANCAKE,
    harvest: false,
    sortOrder: 1,
    isFinished: true,
    depositFee: 100, // 1%
    rewardCut: 1500, // 15%
    rewardCutSplitDevelopmentFund: 50, // 50% of 15%
    rewardCutSplitBuyPlantAndBurn: 50, // 50% of 15%
  },
  {
    vgId: 2,  // pid MasterGardener: 14
    stakingToken: tokens.cake,
    stakingRewardToken: tokens.cake,
    verticalEarningToken: tokens.plant,
    verticalGardenContractAddress: {
      56: '0xD42c7619f1eb403eDbe13Fc3D8F7a95deC9C49B3',
      97: '',
    },
    verticalGardenMasterGardenerPId: 14,
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
