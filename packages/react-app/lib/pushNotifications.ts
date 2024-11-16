import { PushAPI } from "@pushprotocol/restapi";

interface NotificationPayload {
  title: string;
  body: string;
  walletClient: any;
}

export const sendPushNotification = async ({
  title,
  body,
  walletClient,
}: NotificationPayload): Promise<void> => {
  try {
    if (!walletClient) {
      throw new Error(
        "No wallet client available. Ensure the wallet is connected."
      );
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
