"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeb3 } from "@/contexts/useWeb3";
import { NotificationForm } from "../components/Push";
import { useEffect, useState } from "react";

export default function Home() {
    const {
        address,
        getUserAddress,
        getNFTs,
    } = useWeb3();

    useEffect(() => {
        getUserAddress();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const tokenURIs = await getNFTs();
            setUserOwnedNFTs(tokenURIs);
        };
        if (address) {
            getData();
        }
    }, [address]);

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
            </div>'´'
          </>
        )}
      </div>
    );
}
