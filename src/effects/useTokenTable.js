import { useEffect, useState } from 'react';

import { getTokenTableForNetwork } from '../utils';

const useTokenTable = networkId => {
  const [tokenTable, setTokenTable] = useState({});
  useEffect(() => {
    setTokenTable(getTokenTableForNetwork(networkId));
  }, [networkId]);
  return tokenTable;
}

export default useTokenTable;
