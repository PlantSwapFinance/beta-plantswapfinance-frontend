import tokens from './tokens'
import { CafeswapFarmConfig } from './types'

const cafeswapFarms: CafeswapFarmConfig[] = [

  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BREW',
    isTokenOnly: true,
    lpAddresses: {
      97: '',
      56: '0x790Be81C3cA0e53974bE2688cDb954732C9862e1',
    },
    token: tokens.egg,
    quoteToken: tokens.busd,
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'CAKE',
    isTokenOnly: true,
    lpAddresses: {
      97: '',
      56: '0x790Be81C3cA0e53974bE2688cDb954732C9862e1',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
    lp: 'CAKE',
  },

  // CAFE DEX LPS : START

  {
    pid: 14,
    risk: 5,
    lpSymbol: 'BREW-BNB CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x4D1f8F8E579096097809D439d6707f2F5870652A',
    },
    token: tokens.brew,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },
  {
    pid: 15,
    risk: 5,
    lpSymbol: 'BREW-BUSD CAFE LP',
    lpAddresses: {
      97: '',
      56: '0xfd2A5F04368a18D3bD4204d7dEb250b1710Bbc15',
    },
    token: tokens.brew,
    quoteToken: tokens.busd,
    lp: 'CAFE',
  },
  {
    pid: 26,
    risk: 5,
    lpSymbol: 'XDITTO-BNB CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x86e3662634a5c5857Ecf395189f64a98Ea5bb77C',
    },
    token: tokens.xditto,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },

  {
    pid: 25,
    risk: 5,
    lpSymbol: 'MIST-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x1b429194D7deB9fCF6E4b2F201769751c08cf763',
    },
    token: tokens.mist,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },
  {
    pid: 24,
    risk: 5,
    lpSymbol: 'NAUT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x3eba4240e14F9324A49D64409fD3696d47F3dA95',
    },
    token: tokens.naut,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },
  {
    pid: 16,
    risk: 5,
    lpSymbol: 'BREW-CAKE CAFE LP',
    lpAddresses: {
      97: '',
      56: '0xf20b42dE248D736FC19c0e4e30e9EfF432CC06ac',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: false,
    lp: 'CAFE',
  },
  {
    pid: 17,
    risk: 5,
    lpSymbol: 'BREW-ETH CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x1a16e5B892f9f0F851A3c74bDc765855350347e5',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: false,
    lp: 'CAFE',
  },
  {
    pid: 18,
    risk: 5,
    lpSymbol: 'BREW-DOT CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x059Fad611078750bC4a56093264A1d0457f85B91',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: false,
    lp: 'CAFE',
  },
  {
    pid: 21,
    risk: 5,
    lpSymbol: 'BREW-ITAM CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x672345adf54909001EfB62A7b9D8C03eA2736A6A',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    lp: 'CAFE',
  },
  {
    pid: 20,
    risk: 5,
    lpSymbol: 'TWT-BNB CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x4739eE46a7C0D149D0d8A1770c2Fa9979c35f8e3',
    },
    token: tokens.twt,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },
  {
    pid: 23,
    risk: 5,
    lpSymbol: '3CS-BNB CAFE LP',
    lpAddresses: {
      97: '',
      56: '0xFfE22616288488A509CE2f08D44691cd0C005581',
    },
    token: tokens.numbertcs,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },
  {
    pid: 22,
    risk: 5,
    lpSymbol: 'ITAM-BNB CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x25639aC4a9D898CDB35dEf5b8f63EE2C7fD75737',
    },
    token: tokens.itam,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },

  {
    pid: 19,
    risk: 5,
    lpSymbol: 'BNB-BTCB CAFE LP',
    lpAddresses: {
      97: '',
      56: '0x0A6939b4665C51069e976e2ebD0FB3A3cac9dABA',
    },
    token: tokens.bnb,
    quoteToken: tokens.wbnb,
    lp: 'CAFE',
  },
  
  // CAFE DEX LPS : END

  {
    pid: 1,
    risk: 5,
    lpSymbol: 'BREW-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x723203e821f1ff2d0e396d5dd2ea390f3c9d42cf',
    },
    token: tokens.brew,
    quoteToken: tokens.wbnb,
    lp: 'CAKE',
  },

  {
    pid: 2,
    risk: 5,
    lpSymbol: 'BREW-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1FD9Af4999De0d61c2a6CBD3d4892b675a082999',
    },
    token: tokens.brew,
    quoteToken: tokens.busd,
    lp: 'CAKE',
  },

  {
    pid: 5,
    risk: 5,
    lpSymbol: 'BREW-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0xfc4ad134129a7AF5e90673db18b2b067a5Ac9821',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: false,
    lp: 'CAKE',
  },
  {
    pid: 10,
    risk: 5,
    lpSymbol: 'BREW-DOT LP',
    lpAddresses: {
      97: '',
      56: '0xf7d9acD09341877Ed299546B1Eb43c900A2b6323',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: false,
    lp: 'CAKE',
  },
  {
    pid: 7,
    risk: 5,
    lpSymbol: 'BREW-FLP LP',
    lpAddresses: {
      97: '',
      56: '0x25bc28d49b3E3E162E6FDC1E38A8991Cf5c40F51',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    lp: 'CAKE',
  },
  {
    pid: 9,
    risk: 5,
    lpSymbol: 'BREW-ETH LP',
    lpAddresses: {
      97: '',
      56: '0xe71867100e6b7cd8560C3fd2847ff3ab68cCdAD9',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: false,
    lp: 'CAKE',
  },
  {
    pid: 13,
    risk: 5,
    lpSymbol: 'BREW-BANANA APE LP',
    lpAddresses: {
      97: '',
      56: '0x5514E0E1DA40A38E19d58e8B6E16226E16e183fA',
    },
    token: tokens.brew,
    quoteToken: tokens.brew,
    isCommunity: !false,
    lp: 'APE',
  },
  {
    pid: 11,
    risk: 5,
    lpSymbol: 'DITTO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x470BC451810B312BBb1256f96B0895D95eA659B1',
    },
    token: tokens.ditto,
    quoteToken: tokens.wbnb,
    lp: 'CAKE',
  },
  {
    pid: 12,
    risk: 5,
    lpSymbol: 'BIFI-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xd132D2C24F29EE8ABb64a66559d1b7aa627Bd7fD',
    },
    token: tokens.bifi,
    quoteToken: tokens.wbnb,
    lp: 'CAKE',
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    token: tokens.bnb,
    quoteToken: tokens.wbnb,
    lp: 'CAKE',
  },
  {
    pid: 4,
    risk: 5,
    lpSymbol: 'BUSD-DAI LP',
    lpAddresses: {
      97: '',
      56: '0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
    isCommunity: false,
    lp: 'CAKE',
  },

  {
    pid: 6,
    risk: 5,
    lpSymbol: 'BUSD-USDT LP',
    lpAddresses: {
      97: '',
      56: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
    isCommunity: false,
    lp: 'CAKE',
  },

  {
    pid: 8,
    risk: 5,
    lpSymbol: 'FLP-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x07aaf8ae5c4511a9b512ea54e95a60298abc1b4d',
    },
    token: tokens.flp,
    quoteToken: tokens.wbnb,
    isCommunity: false,
    lp: 'CAKE',
  },
]

export default cafeswapFarms
