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
    label: 'Gardens v2',
    icon: 'PoolIcon',
    href: '/gardens',
  },
  {
    label: 'Gardens v1',
    icon: 'PoolIcon',
    href: '/gardensv1',
  },
  {
    label: 'Barn (soon)',
    icon: 'BarnIcon',
    href: '/barns',
  },
  {
    label: 'Development Fund',
    icon: 'TreePlantingIcon',
    href: '/developmentFund',
  },
  {
    label: 'Tree (soon)',
    icon: 'TreeIcon',
    href: '/tree',
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
        label: "PlantSwap Token",
        href: "https://bscscan.com/token/0x58BA5Bd8872ec18BD360a9592149daed2fC57c69",
      },
    ],
  },
]

export default config
