export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

//Rinkeby
const TOKENTABLE_RINKEBY = {
  '0x842b5f2cB93D31AC3A3900AdDA896b223C7A3042': {
    name: 'Sean Token',
    symbol: 'SJC'
  },
  '0x67f729748ec7f2E014A2Fd979c96d0C2eea04cE8': {
    name: 'Moon Unit',
    symbol: 'MNU'
  },
  '0xF3C583014Ce2c2f51eDce1410B7C5eC2eBB66487': {
    name: 'Consensys Token',
    symbol: 'LUB'
  },
}

// Ganache-cli
const TOKENTABLE_GANACHE = {
  '0x315D5060F7A9Bea2260973e14292a0A52dD9BEa3': {
    name: 'Sean Token',
    symbol: 'SJC'
  },
  '0xb4AABe146B3bBd1AB533DE7eB35F2aB7bD03706f': {
    name: 'Moon Unit',
    symbol: 'MNU'
  },
  '0x045Ac947AbD9c6848d815c12B34124fC5a9e1515': {
    name: 'Consensys Token',
    symbol: 'LUB'
  },
  '0x6F3812ef20d2198787be4c96Ac0619017cf5105e': {
    name: 'Fake DAI',
    symbol: 'DAI'
  }
}

export const TOKENTABLES = {
  4: TOKENTABLE_RINKEBY,
  5777: TOKENTABLE_GANACHE
}

export const TIMETABLE = {
  3600: '1 hour',
  86400: '1 day',
  604800: '1 week',
  18144000: '1 month',
}

export const UNISWAP_FACTORY_ADDRESSES = {
  1: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  4: '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36',
  5777: '0xBf3Ca4fA52EA61E446Acb57E0034DaD94790003D'
}
