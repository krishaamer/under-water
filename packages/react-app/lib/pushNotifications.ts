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
