import { MenuEntry } from '@plantswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade (PancakeSwap)',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.pancakeswap.finance/#/swap?inputCurrency=BNB&outputCurrency=0x58BA5Bd8872ec18BD360a9592149daed2fC57c69',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/add/BNB/0x58BA5Bd8872ec18BD360a9592149daed2fC57c69',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Gardens',
    icon: 'PoolIcon',
    href: '/gardens',
  },
  {
    label: 'Vertical Gardens',
    icon: 'TreeIcon',
    href: '/verticalGardens',
    status: {
      text: 'LIVE',
      color: 'failure',
    },
  },
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    calloutClass: 'rainbow',
    items: [
      {
        label: 'Leaderboard',
        href: '/teams',
        status: {
          text: 'NEW',
          color: 'success',
        },
      },
      {
        label: 'Task Center',
        href: '/profile/tasks',
        status: {
          text: 'SOON',
          color: 'textSubtle',
        },
      },
      {
        label: 'Your Profile',
        href: '/profile',
        status: {
          text: 'NEW',
          color: 'success',
        },
      },
    ],
  },
  {
    label: 'Collectibles',
    icon: 'NftIcon',
    href: '/collectibles',
    status: {
      text: 'SOON',
      color: 'textSubtle',
    },
  },
  {
    label: 'Governance',
    icon: 'VoteIcon',
    href: '/vote',
  },
  {
    label: 'Barn',
    icon: 'BarnIcon',
    href: '/barns',
  },
  {
    label: 'Development Fund',
    icon: 'TreePlantingIcon',
    href: '/developmentFund',
  },
  {
    label: "Project",
    icon: "ProjectIcon",
    href: "/project",
  },
  {
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: '/roadmap',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/plantswapfinance',
      },
      {
        label: "Blog",
        href: "https://plantswapfinance.medium.com",
      },
      {
        label: "dex.guru",
        href: "https://dex.guru/token/0x58BA5Bd8872ec18BD360a9592149daed2fC57c69-bsc",
      },
      {
        label: "PlantSwap Token",
        href: "https://bscscan.com/token/0x58BA5Bd8872ec18BD360a9592149daed2fC57c69",
      },
    ],
  },
]

export default config
