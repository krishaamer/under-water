## About The Project

**UnderTheWater** is a smart contract project built using [Hardhat](https://hardhat.org/) that integrates [Toucan](https://app.toucan.earth/contracts), [Sign Protocol](https://sign.global) and [Push Protocol](https://pushprotocol.com/) to provide a seamless workflow for users to offset their carbon credits within an on-chain game. This contract allows users to complete payment, redeem, retire, and attest carbon credits in a single transaction. The notification feature leverages Push Protocol for enhanced communication and user engagement. The attestation feature enabled by Sign Protocol incentivize users to contribute more for their carbon credits offset.


<p align="right">(<a href="#top">back to top</a>)</p>

## Screenshot

<img width="1887" alt="bangkok-under-water" src="https://github.com/user-attachments/assets/bec2251f-52c7-42dd-83d6-d51ee07351f1">


## Built With

UnderTheWater is built on various technologies to facilitate decentralized application development:

- [Solidity](https://docs.soliditylang.org/en/v0.8.19/)
- [Hardhat](https://hardhat.org/)
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Viem](https://viem.sh/)
- [TailwindCSS](https://tailwindcss.com/)
- [Push Protocol](https://pushprotocol.com/)
- [Toucan Protocol](https://toucan.earth/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Smart Contract Related Integration

[Smart Contract related integration](https://github.com/krishaamer/under-water/blob/main/packages/hardhat/README.md)

## Push Protocol Integration

Push Protocol is integrated into the UnderTheWater project to provide on-chain push notifications. This enhances user experience by enabling real-time communication directly from the blockchain.

### Key Features of Push Protocol

- **On-Chain Notifications:** Seamlessly send notifications triggered by smart contract events.
- **User Engagement:** Keep users informed about important actions like transactions, deployments, and updates.
- **Decentralized Messaging:** Ensures that notifications are trustless and decentralized, aligning with the principles of blockchain technology.

### How It Works

UnderTheWater leverages Push Protocol's REST API to send notifications based on specific events occurring within the smart contract. For example, when a user retires carbon credits, a notification is sent to inform them of the successful action.

### Setting Up Push Protocol

1. **Install Push Protocol SDK:**

   ```bash
   npm install @pushprotocol/restapi
   ```

2. **Configure Push Notifications:**

   Implement the Push Protocol in your frontend to send notifications. Refer to the [Push Protocol Documentation](https://docs.pushprotocol.com/) for detailed instructions.

3. **Usage Example:**

   Here's a sample implementation in a Next.js component:

   ```typescript:packages/react-app/lib/pushNotifications.ts
   import { PushAPI } from "@pushprotocol/restapi";

   interface PushNotificationPayload {
     walletClient: any; // Replace 'any' with the correct type if known
     title: string;
     body: string;
   }

   const verifyAndSwitchChain = async (): Promise<void> => {
     const provider = window.ethereum;
     if (!provider) throw new Error("No wallet detected.");

     const chainId = await provider.request({ method: "eth_chainId" });
     console.log("Current chainId:", parseInt(chainId, 16));

     // Check if the user is connected to the Sepolia testnet (chain ID 11155111)
     if (parseInt(chainId, 16) !== 11155111) {
       try {
         console.log("Switching to chain 11155111 (Sepolia testnet)...");
         await provider.request({
           method: "wallet_switchEthereumChain",
           params: [{ chainId: "0xaa36a7" }], // Hexadecimal for 11155111
         });
         console.log("Switched to chain 11155111 (Sepolia testnet).");
       } catch (error: any) {
         if (error.code === 4902) {
           console.log("Adding and switching to Sepolia Testnet...");
           await provider.request({
             method: "wallet_addEthereumChain",
             params: [
               {
                 chainId: "0xaa36a7",
                 chainName: "Sepolia Testnet",
                 rpcUrls: ["https://rpc.sepolia.org"],
                 nativeCurrency: {
                   name: "Sepolia Ether",
                   symbol: "ETH",
                   decimals: 18,
                 },
                 blockExplorerUrls: ["https://sepolia.etherscan.io"],
               },
             ],
           });
           console.log("Added and switched to chain 11155111 (Sepolia testnet).");
         } else {
           console.error("Error during network switching:", error);
           throw error;
         }
       }
     } else {
       console.log("Already connected to chain 11155111 (Sepolia testnet).");
     }
   };

   export const sendPushNotification = async ({
     walletClient,
     title,
     body,
   }: PushNotificationPayload): Promise<void> => {
     try {
       console.log("Verifying chain and switching if necessary...");
       await verifyAndSwitchChain();

       console.log("Initializing Push Protocol user...");
       const user = await PushAPI.initialize(walletClient);

       console.log("Sending Push Notification...");
       const response = await user.channel.send(["*"], {
         notification: {
           title,
           body,
         },
       });

       console.log("Notification sent successfully:", response);
     } catch (error) {
       console.error("Error sending notification:", error);
     }
   };
   ```

   ```tsx:packages/react-app/components/Push.tsx
   "use client";

   import React, { useState } from "react";
   import { sendPushNotification } from "../lib/pushNotifications";
   import { useWalletClient } from "wagmi";
   import Image from "next/image";
   import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
   import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
   } from "@/components/ui/accordion";

   interface NotificationFormProps {
     clickedDistricts: string[];
   }

   export const NotificationForm: React.FC<NotificationFormProps> = ({
     clickedDistricts,
   }) => {
     const { data: walletClient } = useWalletClient();

     const [title, setTitle] = useState<string>("Hi");
     const [body, setBody] = useState<string>(
       "gm frens i'm need help buy carbon creds save bkk from sea level rise.. plsss join!"
     );
     const [feedback, setFeedback] = useState<string>("");
     const [loading, setLoading] = useState<boolean>(false);

     const handleSubmit = async () => {
       setLoading(true);
       setFeedback("");

       try {
         await sendPushNotification({ walletClient, title, body });
         setFeedback("Notification sent!");
       } catch (error) {
         setFeedback("Failed to send notification!");
       } finally {
         setLoading(false);
       }
     };

     return (
       <Accordion type="single" collapsible>
         <AccordionItem value="item-1">
           <AccordionTrigger>Climate Chat</AccordionTrigger>
           <AccordionContent>
             <div className="w-72 mx-auto p-4 bg-white shadow rounded-2xl z-30 pointer-events-auto">
               <Image
                 src={feedback ? "/moo-deng-glasses.jpg" : "/moo-deng.png"}
                 width={150}
                 height={150}
                 alt="Baby Hippo Moo Deng"
                 className="rounded-2xl"
               />
               <button
                 onClick={handleSubmit}
                 disabled={loading}
                 className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 mt-4"
               >
                 {loading ? "Sending..." : "Send Notification"}
               </button>
               {feedback && <p className="mt-2 text-green-600">{feedback}</p>}
             </div>
           </AccordionContent>
         </AccordionItem>
       </Accordion>
     );
   };
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/UnderTheWater.git
   cd UnderTheWater/packages/hardhat
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
   PUSHPROTOCOL_API_KEY=your_pushprotocol_api_key
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

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
