import ConsensysToken from './contracts/ConsensysToken.json';
import FakeDai from './contracts/FakeDai.json';
import MoonToken from './contracts/MoonToken.json';
import SeanToken from './contracts/SeanToken.json';
import UniswapFactory from './contracts/uniswap_factory.json';

import BATIcon from './assets/icons/bat.svg';
import DaiIcon from './assets/icons/dai.svg';
import EthereumIcon from './assets/icons/ethereum.svg';
import MakerIcon from './assets/icons/mkr.svg';
import OmiseGoIcon from './assets/icons/omg.svg';
import ZRXIcon from './assets/icons/zrx.svg';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

//Rinkeby
const RINKEBY_BAT_ADDRESS = '0xDA5B056Cfb861282B4b59d29c9B395bcC238D29B';

// Uniswap's DAI
// const RINKEBY_DAI_ADDRESS = '0x2448eE2641d78CC42D7AD76498917359D961A783';
// Compound's DAI
const RINKEBY_DAI_ADDRESS = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';

const RINKEBY_MKR_ADDRESS = '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85';
const RINKEBY_OMG_ADDRESS = '0x879884c3C46A24f56089f3bBbe4d5e38dB5788C0';
const RINKEBY_ZRX_ADDRESS = '0xF22e3F33768354c9805d046af3C0926f27741B43';

const TOKENTABLE_RINKEBY = {
  [ADDRESS_ZERO]: {
    address: ADDRESS_ZERO,
    icon: EthereumIcon,
    isSource: true,
    name: 'Ethereum',
    symbol: 'ETH'
  },
  [RINKEBY_DAI_ADDRESS]: {
    address: RINKEBY_DAI_ADDRESS,
    // exchange: '',
    icon: DaiIcon,
    isSource: true,
    name: 'Dai Stablecoin',
    symbol: 'DAI'
  },
  [RINKEBY_BAT_ADDRESS]: {
    address: RINKEBY_BAT_ADDRESS,
    // exchange: '0x9B913956036a3462330B0642B20D3879ce68b450',
    icon: BATIcon,
    isSource: false,
    name: 'Basic Attention Token',
    symbol: 'BAT'
  },
  [RINKEBY_MKR_ADDRESS]: {
    address: RINKEBY_MKR_ADDRESS,
    // exchange: '0x93bB63aFe1E0180d0eF100D774B473034fd60C36',
    icon: MakerIcon,
    isSource: false,
    name: 'Maker DAO',
    symbol: 'MKR'
  },
  [RINKEBY_OMG_ADDRESS]: {
    address: RINKEBY_OMG_ADDRESS,
    // exchange: '0x26C226EBb6104676E593F8A070aD6f25cDa60F8D',
    icon: OmiseGoIcon,
    isSource: false,
    name: 'Omise Go',
    symbol: 'OMG'
  },
  [RINKEBY_ZRX_ADDRESS]: {
    address: RINKEBY_ZRX_ADDRESS,
    // exchange: '0xaBD44a1D1b9Fb0F39fE1D1ee6b1e2a14916D067D',
    icon: ZRXIcon,
    isSource: false,
    name: '0x Protocol',
    symbol: 'ZRX'
  }
}

// Ganache-cli
const GANACHE_DAI_ADDRESS = FakeDai.networks['5777'].address;
const GANACHE_SJC_ADDRESS = SeanToken.networks['5777'].address;
const GANACHE_MNU_ADDRESS = MoonToken.networks['5777'].address;
const GANACHE_LUB_ADDRESS = ConsensysToken.networks['5777'].address;

const TOKENTABLE_GANACHE = {
  [ADDRESS_ZERO]: {
    address: ADDRESS_ZERO,
    icon: EthereumIcon,
    isSource: true,
    name: 'Ethereum',
    symbol: 'ETH'
  },
  [GANACHE_DAI_ADDRESS]: {
    address: GANACHE_DAI_ADDRESS,
    icon: DaiIcon,
    isSource: true,
    name: 'Fake DAI',
    symbol: 'DAI'
  },
  [GANACHE_SJC_ADDRESS]: {
    address: GANACHE_SJC_ADDRESS,
    isSource: false,
    name: 'Sean Token',
    symbol: 'SJC'
  },
  [GANACHE_MNU_ADDRESS]: {
    address: GANACHE_MNU_ADDRESS,
    isSource: false,
    name: 'Moon Unit',
    symbol: 'MNU'
  },
  [GANACHE_LUB_ADDRESS]: {
    address: GANACHE_LUB_ADDRESS,
    isSource: false,
    name: 'Consensys Token',
    symbol: 'LUB'
  }
}

export const TOKENTABLES = {
  4: TOKENTABLE_RINKEBY,
  5777: TOKENTABLE_GANACHE
}

export const TIMETABLE = {
  3600: 'hourly',
  86400: 'daily',
  604800: 'weekly',
  18144000: 'monthly',
}

export const UNISWAP_FACTORY_ADDRESSES = {
  1: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  4: '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36',
  5777: UniswapFactory.networks['5777'].address
}
