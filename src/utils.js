import { TOKENTABLES, UNISWAP_FACTORY_ADDRESSES } from './constants';

export const dateObjDisplayFormatter = dateObj => {
    const year = dateObj.getUTCFullYear();
    const date = [dateObj.getUTCMonth() + 1, dateObj.getUTCDate()]
      .map(output => `0${output}`.slice(-2))
      .join('-');
    const time = [dateObj.getUTCHours(), dateObj.getUTCMinutes(), dateObj.getUTCSeconds()]
      .map(output => `0${output}`.slice(-2))
      .join(':');
    return `${year}-${date} ${time} UTC`;
};

export const findTokenByFieldName = (fieldName, value, networkId) => {
  const tokenTable = getTokenTableForNetwork(networkId);
  return Object.values(tokenTable).find(token => token[fieldName] === value);
}

export const filterTokensByFieldName = (fieldName, value, networkId) => {
  const tokenTable = getTokenTableForNetwork(networkId);
  return Object.values(tokenTable).filter(token => token[fieldName] === value);
}

export const getTokenTableForNetwork = networkId =>
  TOKENTABLES[networkId];

export const getUniswapFactoryAddress = networkId =>
  UNISWAP_FACTORY_ADDRESSES[networkId];
