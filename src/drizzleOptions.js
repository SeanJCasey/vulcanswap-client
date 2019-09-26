import CostAverageOrderBook from './contracts/CostAverageOrderBook.json';

const options = {
  contracts: [
    CostAverageOrderBook
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
