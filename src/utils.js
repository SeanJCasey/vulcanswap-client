import { TOKENTABLES, UNISWAP_FACTORY_ADDRESSES } from './constants';

// Oct 3, 2019 - 8:14pm
Date.monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const dateObjDisplayFormatter = dateObj => {
    const year = dateObj.getFullYear();
    const month = Date.monthAbbr[dateObj.getMonth()];
    const date = `0${dateObj.getDate()}`.slice(-2);

    let hours = dateObj.getHours();
    let pm = false
    if (hours > 12) {
      pm = true;
      hours -= 12;
    }

    const minutes = `0${dateObj.getMinutes()}`.slice(-2);

    return `${month} ${date}, ${year} - ${hours}:${minutes} ${pm ? "pm" : "am"}`;
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

// Produces amounts like 1.35 (not 1.352) or 1.4 (not 1.40) given 2 decimals
export const truncateAmountToMaxDecimals = (amount, decimals) =>
  Number(Number(amount).toFixed(decimals))

// Produces string like 0x123...890
export const truncateStringMiddle = (string, startChars, endChars) =>
  `${string.substr(0, startChars)}...${string.substr(string.length - endChars)}`;
