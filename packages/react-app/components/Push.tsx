"use client";

import React, { useState } from "react";
import { sendPushNotification } from "../lib/pushNotifications";
import { useWalletClient } from "wagmi";
import { districts } from "../lib/districts";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NotificationFormProps {
  clickedDistricts: string[];
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  clickedDistricts,
}) => {
  const { data: walletClient } = useWalletClient();

  const [title, setTitle] = useState<string>("Hi");
  const [body, setBody] = useState<string>(
    "hi y'all i'm need help to buy carbon credits to de-flood bangkok.. plsss join!"
  );
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback("");

    try {
      await sendPushNotification({ walletClient, title, body });
      setFeedback("help request sent successfully!");
    } catch (error) {
      setFeedback("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-64 mx-auto p-6 bg-white shadow rounded-2xl">
        <Image
          src="/moo-deng.png"
          width={200}
          height={200}
          alt="Baby Hippo Moo Deng"
          className="rounded-2xl"
        />
        <div className="space-y-4">
          <label className="block">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-24"
              placeholder="Enter notification body"
            ></textarea>
          </label>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full px-4 py-2 font-semibold text-white rounded-2xl ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {loading ? "asking for help..." : "notify all my frens!"}
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
      {feedback && (
        <div className="p-2 rounded-2xl shadow bg-white mt-2" id="my-friend">
          <p className="text-sm font-medium p-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            les gooo! click-click-clickk! rn bkk un-floooooded districts:{" "}
            {clickedDistricts.length}/{districts.length}
          </p>
        </div>
      )}
    </>
  );
};
