import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
require('dotenv').config();

const INFURA_API_KEY = process.env.INFURA_PROJECT_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const CELOSCAN_API_KEY = process.env.CELOSCAN_API_KEY;

if (!INFURA_API_KEY) {
  throw new Error('INFURA_API_KEY is not set in the environment variables');
}
if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not set in the environment variables');
}
if (!BASESCAN_API_KEY) {
  throw new Error('BASESCAN_API_KEY is not set in the environment variables');
}
if (!CELOSCAN_API_KEY) {
  throw new Error('CELOSCAN_API_KEY is not set in the environment variables');
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 1,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    linea: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 59144,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 137,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    base: {
      url: `https://base-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 8453,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    baseSepolia: {
      url: `https://base-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 84532,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    baseSepoliaBlockscout: {
      url: `https://base-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 84532,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    blast: {
      url: `https://blast-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 81457,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 10,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 42161,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    palm: {
      url: `https://palm-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 11297108109,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    avalanche: {
      url: `https://avalanche-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 43114,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    starknet: {
      url: `https://starknet-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    celo: {
      url: `https://celo-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 42220,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    zksync: {
      url: `https://zksync-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 324,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    bsc: {
      url: `https://bsc-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 56,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mantle: {
      url: `https://mantle-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 5000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    opbnb: {
      url: `https://opbnb-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 204,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    scroll: {
      url: `https://scroll-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 534352,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    zkLinkNova: {
      url: 'https://rpc.zklink.io',
      chainId: 810180,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    manta: {
      url: 'https://pacific-rpc.manta.network/http',
      chainId: 169,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    alfajores: {
      url: 'https://celo-alfajores.infura.io/v3/${INFURA_API_KEY}',
      chainId: 44787,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    alfajoresBlockscout: {
      url: 'https://celo-alfajores.infura.io/v3/${INFURA_API_KEY}',
      chainId: 44787,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  defaultNetwork: 'mainnet',
  etherscan: {
    apiKey: {
      baseSepolia: BASESCAN_API_KEY,
      baseSepoliaBlockscout: "abc",
      alfajores: CELOSCAN_API_KEY,
      alfajoresBlockscout: "abc"
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532, 
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "baseSepoliaBlockscout",
        chainId: 84532, 
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com/",
        }
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: `https://api-alfajores.celoscan.io/api`,
          browserURL: "https://alfajores.celoscan.io/"
        }
      },
      {
        network: "alfajoresBlockscout",
        chainId: 44787,
        urls: {
          apiURL: "https://celo-alfajores.blockscout.com/api",
          browserURL: "https://celo-alfajores.blockscout.com/",
        }
      }
    ]
  }
};

export default config;