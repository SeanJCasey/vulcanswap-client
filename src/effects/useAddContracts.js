import { useState, useEffect } from 'react';
import IERC20 from '../contracts/IERC20.json';
import UniswapFactoryInterface from '../contracts/UniswapFactoryInterface.json';

import {
  getTokenTableForNetwork,
  getUniswapFactoryAddress
} from '../utils';

const useAddContracts = (initialized, drizzle) => {
  const [contractsAdded, setContractsAdded] = useState(false);

  useEffect(() => {
    // Only run if initialized and contracts not added yet
    if (!initialized || contractsAdded) return;

    const networkId = drizzle.store.getState().web3.networkId;

    // Add Uniswap factory interface
    const uniswapFactoryAddress = getUniswapFactoryAddress(networkId);

    const uniswapFactoryConfig = {
      contractName: 'UniswapFactoryInterface',
      web3Contract: new drizzle.web3.eth.Contract(
        UniswapFactoryInterface.abi,
        uniswapFactoryAddress
      )
    };
    drizzle.addContract(uniswapFactoryConfig);

    // Add ERC20 token interfaces
    const tokenTable = getTokenTableForNetwork(networkId);
    const tokenConfigs = Object.values(tokenTable).map(token => {
      return {
        contractName: `I${token.symbol}`,
        web3Contract: new drizzle.web3.eth.Contract(
          IERC20.abi,
          token.address
        )
      };
    });
    for (const tokenConfig of tokenConfigs) {
      drizzle.addContract(tokenConfig, ["Transfer"]);
    }

    // Set contracts as having been added
    setContractsAdded(true);
  }, [contractsAdded, drizzle, initialized])

  return contractsAdded;
}

export default useAddContracts;
