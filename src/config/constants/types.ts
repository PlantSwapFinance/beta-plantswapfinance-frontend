import { TranslatableText } from 'state/types'

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  plantToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  tokenSymbol: string
  releaseBlockNumber: number
  campaignId?: string
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'PANCAKE' = 'PancakeSwap',
  'GOOSE' = 'GooseFinance',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export enum VerticalGardenCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'PANCAKE' = 'PancakeSwap',
  'CAFE' = 'CafeSwap',
  'GOOSE' = 'GooseFinance',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

export interface FarmConfig {
  pid: number
  risk: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  isTokenOnly?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface VerticalGardenConfig {
  vgId: number
  stakingToken: Token
  stakingRewardToken: Token
  verticalEarningToken: Token
  verticalGardenContractAddress: Address
  verticalGardenMasterGardenerPId?: number
  verticalGardenMasterGardenerAllocPt?: number
  verticalGardenCategory?: VerticalGardenCategory
  harvest?: boolean
  sortOrder?: number
  isFinished?: boolean
  stakingLimit?: number
  depositFee?: number
  rewardCut?: number
  rewardCutSplitDevelopmentFund?: number
  rewardCutSplitBuyPlantAndBurn?: number
}

export interface BarnBetaConfig {
  chefTag: string
  chefAddess: Address
  chefAbi: string
  pid: number
  risk: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  isTokenOnly?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
}

export interface PancakeSwapFarmConfig {
  chefTag?: string
  chefAddess?: Address
  chefAbi?: string
  pid: number
  risk?: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  isTokenOnly?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface GooseFarmConfig {
  chefTag?: string
  chefAddess?: Address
  chefAbi?: string
  pid: number
  risk?: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  isTokenOnly?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface CafeswapFarmConfig {
  chefTag?: string
  chefAddess?: Address
  chefAbi?: string
  pid: number
  risk?: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  isTokenOnly?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
  lp?: string
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  farmerId: number
  video?: NftVideo
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}
