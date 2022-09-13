// abis and contracts
import { erc20ABI } from 'wagmi';
import minerJson from '../artifacts/contracts/Miner.sol/Miner.json';
import lotteryJson from '../artifacts/contracts/Lottery.sol/Lotto.json';
import estimatorJson from '../artifacts/contracts/LPTokenEstimator.sol/LPTokenEstimator.json';
import routerJson from '../artifacts/contracts/test_contracts/JoeRouter02.sol/IJoeRouter02.json';
const minerAbi = minerJson.abi;
const lottoAbi = lotteryJson.abi;
const estimatorAbi = estimatorJson.abi;
const routerAbi = routerJson.abi;

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// use avax by default in prod and localhost by default in dev
export const defaultChain = process.env.NODE_ENV === 'production' ? 43_114 : 1337
export const chains = [
  {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    testnet: false,
  },
  {
    id: 43_113,
    name: 'Avalanche Fuji Testnet',
    network: 'avalancheFuji',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: 'https://api.avax-test.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
    },
    testnet: true,
  },
  {
    id: 1337,
    name: 'Ganache',
    network: 'ganache',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'http://127.0.0.1:8545',
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://wagmi.sh' },
    },
    testnet: true
  }
]

export const MAX_APPROVAL = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const MINER = {
  1337: {
    address: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
    abi: minerAbi,
  },
  43113: {
    address: '0x804c43ff71244e4bC3EB085175B1358da242C811',
    abi: minerAbi,
  },
  43114: {
    address: '0x2707ccc10D6C1ce49f72867aB5b85dE11e64979f',
    abi: minerAbi,
  }
}

export const TOKEN = {
  1337: {
    address: '0x3Aa71a78bB8c0c0287beCc64665140841300032d',
    abi: erc20ABI
  },
  43113: {
    address: '0xC9939517092222b9A0964b527bCdf3680150933C',
    abi: erc20ABI
  },
  43114: {
    address: '0xe00b91f35924832d1a7d081d4dced55f3b80fb5c', // Grape/xGrape SW LP token
    abi: erc20ABI
  }
}

export const GRAPEMIM = {
  1337: {
    address: '0xb382247667fe8ca5327ca1fa4835ae77a9907bc8',
    abi: erc20ABI
  },
  43113: {
    address: '0xb382247667fe8ca5327ca1fa4835ae77a9907bc8',
    abi: erc20ABI
  },
  43114: {
    address: '0xb382247667fe8ca5327ca1fa4835ae77a9907bc8', // Grape/MIM TJ LP token
    abi: erc20ABI
  }
}

export const WINE = {
  1337: {
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    abi: erc20ABI,
  },
  43113: {
    address: '0x662A4633f1e6413EeBaff17604C896D72748DCC7',
    abi: erc20ABI,
  },
  43114: {
    address: '0xC55036B5348CfB45a932481744645985010d3A44',
    abi: erc20ABI,
  }
}

export const MIM = {
  1337: {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: erc20ABI,
  },
  43113: {
    address: '0xe02bEe8348254eD0A61BBfc89BAb5feB71721CFc',
    abi: erc20ABI
  },
  43114: {
    address: '0x130966628846BFd36ff31a822705796e8cb8C18D',
    abi: erc20ABI,
  }
}

export const LOTTO = {
  1337: {
    address: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    abi: lottoAbi
  },
  43113: {
    address: '0xa154c85aA9072b86dE6C0693DfD978ac4d4E9eC4',
    abi: lottoAbi
  },
  43114: {
    address: '0xc9e611b577667d722C5e0e36fd8AC43840B6de95',
    abi: lottoAbi,
  }
}

export const GRAPE = {
  1337: {
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    abi: erc20ABI,
  },
  43113: {
    address: '0x662A4633f1e6413EeBaff17604C896D72748DCC7',
    abi: erc20ABI,
  },
  43114: {
    address: '0x5541D83EFaD1f281571B343977648B75d95cdAC2',
    abi: erc20ABI,
  }
}

export const ESTIMATOR = {
  1337: {
    address: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    abi: estimatorAbi
  },
  43113: {
    address: '0x8228dEf793D8C8c72DC9CB2698A5dd6448103306',
    abi: estimatorAbi
  },
  43114: {
    address: '0x0d18a1876A1Df3271f441C3693F906dee9272125',
    abi: estimatorAbi
  },
}

export const ROUTER = {
  1337: {
    address: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    abi: routerAbi,
  },
  43113: {
    address: '0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901',
    abi: routerAbi,
  },
  43114: {
    address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
    abi: routerAbi,
  },
}
