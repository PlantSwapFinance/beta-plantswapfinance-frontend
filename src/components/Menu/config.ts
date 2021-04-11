import { MenuEntry } from '@plantswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade (soon)',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://beta-plantswapfinance-swap.netlify.app/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://beta-plantswapfinance-swap.netlify.app/#/pool',
      },
    ],
  },
  {
    label: 'Farms (soon)',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Garden (soon)',
    icon: 'PoolIcon',
    href: '/gardens',
  },
  {
    label: 'Barn (soon)',
    icon: 'PoolIcon',
    href: '/barn',
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
