# UnderTheWater

## Overview

**UnderTheWater** is a smart contract project built using [Hardhat](https://hardhat.org/) that integrates [Toucan](https://app.toucan.earth/contracts) and [Sign Protocol](https://testnet-scan.sign.global/) to provide a seamless workflow for users. This contract allows users to complete payment, redeem, retire, and attest carbon credits in a single transaction. The attestation feature leverages Sign Protocol for enhanced security and verification.

The contract is deployed on Base Sepolia and has been verified on both Etherscan and Blockscout:
- [Blockscout Verification](https://base-sepolia.blockscout.com/address/0xec28980605615954f48338c68a5623fd748065cc#code)
- [Etherscan Verification](https://sepolia.basescan.org/address/0xec28980605615954f48338c68a5623fd748065cc#code)

**Attestation Example:**  
[Sign Protocol Example](https://testnet-scan.sign.global/schema/onchain_evm_84532_0x4b5)

---

### 🌟 **Enhanced Multi-Network Support**

**UnderTheWater** extends its functionality to support **Polygon** and **Celo** networks, ensuring broader accessibility and utility. By leveraging Toucan's deployed [OffsetHelper contracts](https://github.com/ToucanProtocol/OffsetHelper/tree/main/deployments), users can effortlessly perform the following operations:

- **One-Click Swaps, Redeems, and Retirements:** All performed via the OffsetHelper contracts.
  - **Polygon:** Use USDC ([USDC on Polygon](https://polygonscan.com/address/0x2791bca1f2de4661ed88a30c99a7a9449aa84174)) at [OffsetHelper Polygon](https://polygonscan.com/address/0x7cB7C0484d4F2324F51d81E2368823c20AEf8072).
  - **Celo:** Use cUSD ([cUSD on Celo](https://celoscan.io/address/0x765de816845861e75a25fca122bb6898b8b1282a)) at [OffsetHelper Celo](https://celoscan.io/address/0x4242829D15434Fea6606CF995f1BEd68a18C37d1).

These integrations enable **seamless carbon credit offsets** directly within the game environment, enhancing user experience and promoting sustainable practices.

## Features

- **Integrated Carbon Management:** Combine payment, redeem, retire, and attestation in a single transaction.
- **Attestation Integration:** Utilize Sign Protocol for secure and verifiable attestations.
- **Multi-Network Support:** Deploy and interact on Base Sepolia, Polygon, and Celo networks.
- **Verified Deployments:** Contracts verified on Etherscan and Blockscout for transparency.
- **One-Click Operations:** Simplify carbon credit offset processes with single-click swaps and retires via OffsetHelper contracts.

## Prerequisites

- **Node.js:** [Download](https://nodejs.org/)
- **Yarn or npm:** For managing dependencies.
- **Hardhat:** Installed as a development dependency.
- **Environment Variables:** Configure a `.env` file with necessary API and private keys.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/underthewater.git
   cd underthewater/packages/hardhat
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `packages/hardhat` directory:

   ```env
   INFURA_PROJECT_ID=your_infura_project_id
   PRIVATE_KEY=your_private_key
   BASESCAN_API_KEY=your_basescan_api_key
   CELOSCAN_API_KEY=your_celoscan_api_key
   ```

## Configuration

The `hardhat.config.ts` is set up to support multiple networks with:

- **Solidity Compiler:** Version `0.8.20` with optimizer enabled.
- **Networks:**
  - **Base Sepolia:** Deployed and verified on Etherscan and Blockscout.
  - **Polygon:** Uses USDC ([USDC on Polygon](https://polygonscan.com/address/0x2791bca1f2de4661ed88a30c99a7a9449aa84174)) at [OffsetHelper Polygon](https://polygonscan.com/address/0x7cB7C0484d4F2324F51d81E2368823c20AEf8072).
  - **Celo:** Uses cUSD ([cUSD on Celo](https://celoscan.io/address/0x765de816845861e75a25fca122bb6898b8b1282a)) at [OffsetHelper Celo](https://celoscan.io/address/0x4242829D15434Fea6606CF995f1BEd68a18C37d1).
- **Etherscan Verification:** Configured for Basescan and Blockscout.

Modify `hardhat.config.ts` to add or adjust network settings as needed.

## Usage

### Common Tasks

- **Display Help:**

  ```shell
  npx hardhat help
  ```

- **Run Tests:**

  ```shell
  npx hardhat test
  ```

- **Run Tests with Gas Reporting:**

  ```shell
  REPORT_GAS=true npx hardhat test
  ```

- **Start a Local Hardhat Node:**

  ```shell
  npx hardhat node
  ```

- **Deploy Contracts Using Ignition Module:**

  ```shell
  npx hardhat ignition deploy ./ignition/modules/Lock.ts
  ```

### Deploying the Contract

Use the deployment script to deploy `UnderTheWater`:

```bash
npx hardhat run scripts/deploy.ts --network your_network
```

**Example: Deploying to Base Sepolia**

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### Verifying the Contract

The deployment script automatically verifies the contract on Basescan and Blockscout. Ensure API keys are correctly set in the `.env` file.

## Scripts

### Deployment Script

The `deploy.ts` script deploys the contract and verifies it on multiple explorers.

```typescript
import hre from "hardhat";

async function main() {
  const underTheWater = await hre.viem.deployContract("UnderTheWater");
  console.log("UnderTheWater deployed to:", underTheWater.address);
  
  // Log deployment info
  console.log("Deployment info:", {
    address: underTheWater.address,
    abi: underTheWater.abi
  });

  // Verify on Basescan
  console.log("Verifying contract on Basescan...");
  try {
    await hre.run("verify:verify", {
      address: underTheWater.address,
      constructorArguments: [],
      network: "baseSepolia"
    });
  } catch (error) {
    console.error("Basescan verification failed:", error);
  }

  // Verify on Blockscout
  console.log("Verifying contract on Blockscout...");
  try {
    await hre.run("verify:verify", {
      address: underTheWater.address,
      constructorArguments: [],
      network: "baseSepoliaBlockscout"
    });
  } catch (error) {
    console.error("Blockscout verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## Testing

No tests are currently specified. To add tests:

1. Create test files in the `test` directory.
2. Write tests using Hardhat's testing framework.
3. Run tests with:

   ```bash
   npx hardhat test
   ```

## Contract Details

### UnderTheWater.sol

Includes functionalities for withdrawing tokens from a faucet, redeeming tokens from pools, handling retirement requests, and creating attestations.

#### Key Functions

- **withdrawFromFaucet:** Withdraws NCT tokens from a faucet.
- **redeemFromPool:** Redeems TCO2 tokens from a pool with fee calculations.
- **requestTCO2Retirement:** Submits a retirement request for TCO2 tokens.
- **executeSequence:** Executes the complete workflow.
- **createRetirementAttestation:** Creates an attestation for the retirement.

## GitHub Repository Structure

```
packages/
└── hardhat/
    ├── contracts/
    │   └── UnderTheWater.sol
    ├── scripts/
    │   └── deploy.ts
    ├── .gitignore
    ├── hardhat.config.ts
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Environment Configuration

Ensure your `.env` includes:

```
INFURA_PROJECT_ID=your_infura_project_id
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_basescan_api_key
CELOSCAN_API_KEY=your_celoscan_api_key
```

**Note:** The `.gitignore` is configured to ignore the `.env` file to protect sensitive information.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## Contact

For inquiries or support, contact [your-email@example.com](mailto:your-email@example.com).
