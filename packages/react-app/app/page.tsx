"use client";

import { useWeb3 } from "@/contexts/useWeb3";
import { NotificationForm } from "../components/Push";
import { useEffect, useState } from "react";

export default function Home() {
  const { address, getUserAddress } = useWeb3();

  useEffect(() => {
    getUserAddress();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {!address && (
        <div className="h1">Please install Metamask and connect.</div>
      )}

      {address && (
        <>
          <NotificationForm />
          <div className="h2 text-center">
            Your address: <span className="font-bold text-sm">{address}</span>
          </div>
        </>
      )}
    </div>
  );
}
