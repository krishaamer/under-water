"use client";

import React, { useState } from "react";
import { sendPushNotification } from "../lib/pushNotifications";
import { useWalletClient } from "wagmi";

export const NotificationForm: React.FC = () => {
  const { data: walletClient } = useWalletClient();

  const [title, setTitle] = useState<string>("Hello World Notification");
  const [body, setBody] = useState<string>(
    "Web3 native notifications are here!"
  );
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback("");

    try {
      await sendPushNotification({ walletClient, title, body });
      setFeedback("Notification sent successfully!");
    } catch (error) {
      setFeedback("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Send Notification
      </h1>
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter notification title"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-medium">Body:</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter notification body"
          ></textarea>
        </label>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full px-4 py-2 font-semibold text-white rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
        {feedback && (
          <p
            className={`text-center mt-4 ${
              feedback.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};
