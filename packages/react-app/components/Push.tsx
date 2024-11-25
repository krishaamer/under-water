"use client";

import React, { useState } from "react";
import { sendPushNotification } from "../lib/pushNotifications";
import { useWalletClient } from "wagmi";
import { districts } from "../lib/districts";
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
      setFeedback("!!!");
    } catch (error) {
      setFeedback("failezzzzz!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>climate chat</AccordionTrigger>
        <AccordionContent>
          <div className="w-72 mx-auto p-4 bg-white shadow rounded-2xl z-30 pointer-events-auto">
            <Image
              src={feedback ? "/moo-deng-glasses.jpg" : "/moo-deng.png"}
              width={150}
              height={150}
              alt="Baby Hippo Moo Deng"
              className="rounded-2xl"
            />
            <div className="space-y-4">
              <label className="block">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-20"
                  placeholder="Enter notification body"
                ></textarea>
              </label>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-4 py-2 font-semibold text-white rounded-2xl ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                {loading ? "asking for help..." : "notify my frens!"}
              </button>
              {feedback && (
                <p
                  className={`text-center mt-4 ${
                    feedback.includes("!!!")
                      ? "text-green-500 hidden"
                      : "text-red-500"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </div>
          </div>
          {feedback && (
            <div
              className="p-2 rounded-2xl shadow bg-white mt-2"
              id="my-friend"
            >
              <p className="text-sm font-medium p-2">
                <span className="text-sm font-bold">fren</span>
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="fren" />
                  <AvatarFallback>FR</AvatarFallback>
                </Avatar>
                les gooo! saved districts:
                {clickedDistricts.length}/{districts.length}
              </p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
