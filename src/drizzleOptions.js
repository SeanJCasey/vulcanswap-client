import CostAverageOrderBook from './contracts/CostAverageOrderBook.json';
import ConsensysToken from './contracts/ConsensysToken.json';
import MoonToken from './contracts/MoonToken.json';
import SeanToken from './contracts/SeanToken.json';
import UniswapFactoryInterface from './contracts/UniswapFactoryInterface.json';

import { getUniswapFactoryAddress } from './utils';

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

const networkId = web3.currentProvider.networkVersion;
const uniswapFactoryAddress = getUniswapFactoryAddress(networkId);

const options = {
  contracts: [
    CostAverageOrderBook,
    ConsensysToken,
    MoonToken,
    SeanToken,
    {
        contractName: 'UniswapFactoryInterface',
        web3Contract: new web3.eth.Contract(
            UniswapFactoryInterface.abi,
            uniswapFactoryAddress,
            { data: 'deployedBytecode' }
        )
    },
  ],
  // events: {
  //   CostAverageOrderBook: [],
  // },
  polls: {
    accounts: 3000,
    blocks: 10000
  },
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};

export default options;
