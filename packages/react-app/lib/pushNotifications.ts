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

  // Check if the user is connected to the correct network
  if (parseInt(chainId, 16) !== 44787) {
    try {
      console.log("Switching to chain 44787...");
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaef3" }], // Hexadecimal for 44787
      });
      console.log("Switched to chain 44787.");
    } catch (error: any) {
      if (error.code === 4902) {
        console.log("Adding and switching to Celo Alfajores Testnet...");
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaef3",
              chainName: "Celo Alfajores Testnet",
              rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
              nativeCurrency: {
                name: "Celo",
                symbol: "CELO",
                decimals: 18,
              },
              blockExplorerUrls: ["https://alfajores.celoscan.io"],
            },
          ],
        });
        console.log("Added and switched to chain 44787.");
      } else {
        console.error("Error during network switching:", error);
        throw error;
      }
    }
  } else {
    console.log("Already connected to chain 44787.");
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
