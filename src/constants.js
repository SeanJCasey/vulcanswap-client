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
  '0x18C1103037a2AF72cAF505619D92a123242bD99E': {
    name: 'Sean Token',
    symbol: 'SJC'
  },
  '0x3979b72e06C7115F63D95F2E1E50c433ccAe5318': {
    name: 'Moon Unit',
    symbol: 'MNU'
  },
  '0xbeb72a44C0C6e8dF8C69A7B630C95aE03DBfDcD8': {
    name: 'Consensys Token',
    symbol: 'LUB'
  },
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
  5777: '0xb27C414Ac8964D0079d2708b4f52B88DB3C09c21'
}
