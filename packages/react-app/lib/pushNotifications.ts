import { PushAPI } from "@pushprotocol/restapi";
import { useWalletClient } from "wagmi";

interface NotificationPayload {
  title: string;
  body: string;
}

export const sendPushNotification = async ({
  title,
  body,
}: NotificationPayload): Promise<void> => {
  try {
    // Use the wallet client from wagmi
    const { data: walletClient } = useWalletClient();

    if (!walletClient) {
      throw new Error("No wallet client available. Ensure the wallet is connected.");
    }

    // Initialize Push Protocol user
    const user = await PushAPI.initialize(walletClient);

    // Send the notification
    const apiResponse = await user.channel.send(["*"], {
      notification: {
        title,
        body,
      },
    });

    console.log("Notification sent successfully:", apiResponse);
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};
