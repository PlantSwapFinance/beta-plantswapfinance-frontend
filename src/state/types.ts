import { Toast } from '@plantswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { CampaignType, FarmConfig, VerticalGardenConfig, BarnBetaConfig, Nft, PoolConfig, PancakeSwapFarmConfig, GooseFarmConfig, CafeswapFarmConfig, Team } from 'config/constants/types'

export type TranslatableText =
  | string
  | {
      id: number
      fallback: string
      data?: {
        [key: string]: string | number
      }
    }

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTokenBalanceMC?: BigNumber
  lpTokenRatio?: BigNumber
  lpTotalSupply?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Garden extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface VerticalGarden extends VerticalGardenConfig {
  totalStaked?: BigNumber
  totalStakedEachBlock?: BigNumber
  totalPendingStakedRewardToSplit?: BigNumber
  totalPendingPlantRewardToSplit?: BigNumber
  pendingStakedInStakedMasterChef?: BigNumber
  pendingPlantInPlantMasterGardener?: BigNumber
  freezeContractTillBloc?: BigNumber
  lastRewardUpdateBlock?: BigNumber
  lastRewardUpdateBlockPrevious?: BigNumber
  lastRewardUpdateTotalStakedToken?: BigNumber
  lastRewardUpdateRewardTokenGained?: BigNumber
  lastRewardUpdatePlantGained?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    allowanceReward: BigNumber
    allowancePlant: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
    pendingPlantReward: BigNumber
    estimateReward: BigNumber
    estimatePlantReward: BigNumber
    harvestedReward: BigNumber
    harvestedPlant: BigNumber
    compoundedReward: BigNumber
  }
}

export interface BarnBeta extends BarnBetaConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}


export interface PlantswapFarm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTokenBalanceMC?: BigNumber
  lpTokenRatio?: BigNumber
  lpTotalSupply?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}


export interface PancakeSwapFarm extends PancakeSwapFarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTokenBalanceMC?: BigNumber
  lpTokenRatio?: BigNumber
  lpTotalSupply?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}


export interface GooseFarm extends GooseFarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTokenBalanceMC?: BigNumber
  lpTokenRatio?: BigNumber
  lpTotalSupply?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface CafeswapFarm extends CafeswapFarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTokenBalanceMC?: BigNumber
  lpTokenRatio?: BigNumber
  lpTotalSupply?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}


export interface Profile {
  userId: number
  points: number
  teamId: number
  nftAddress: string
  tokenId: number
  isActive: boolean
  username: string
  nft?: Nft
  team: Team
  hasRegistered: boolean
}

// Slices states

export interface ToastsState {
  data: Toast[]
}

export interface FarmsState {
  data: Farm[]
}

export interface GardensState {
  data: Garden[]
}

export interface VerticalGardensState {
  data: VerticalGarden[]
}

export interface BarnsBetaState {
  data: BarnBeta[]
}

export interface PoolsState {
  data: Pool[]
}

export interface PlantswapFarmsState {
  data: PlantswapFarm[]
}

export interface PancakeSwapFarmsState {
  data: PancakeSwapFarm[]
}

export interface GooseFarmsState {
  data: GooseFarm[]
}

export interface CafeswapFarmsState {
  data: CafeswapFarm[]
}

export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  hasRegistered: boolean
  data: Profile
}

export type TeamResponse = {
  0: string
  1: string
  2: string
  3: string
  4: boolean
}

export type TeamsById = {
  [key: string]: Team
}

export interface TeamsState {
  isInitialized: boolean
  isLoading: boolean
  data: TeamsById
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

export interface AchievementState {
  data: Achievement[]
}

// API Price State
export interface PriceList {
  [key: string]: number
}

export interface PriceApiResponse {
  /* eslint-disable camelcase */
  update_at: string
  prices: PriceList
}

export interface PriceState {
  isLoading: boolean
  lastUpdated: string
  data: PriceList
}

// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Global state

export interface State {
  farms: FarmsState
  gardens: GardensState
  verticalGardens: VerticalGardensState
  barnsBeta: BarnsBetaState
  toasts: ToastsState
  prices: PriceState
  pools: PoolsState
  profile: ProfileState
  teams: TeamsState
  achievements: AchievementState
  block: BlockState
  plantswapFarms: PlantswapFarmsState
  pancakeSwapFarms: PancakeSwapFarmsState
  gooseFarms: GooseFarmsState
  cafeswapFarms: CafeswapFarmsState
}
