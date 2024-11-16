"use client";

import { useWeb3 } from "@/contexts/useWeb3";
import { NotificationForm } from "../components/Push";
import { useEffect, useState } from "react";

const switchToAlfajores = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaef3" }], // Hexadecimal for 44787
    });
  } catch (switchError) {
    // Assert the type of switchError
    const error = switchError as any;

    console.error("Network switch failed:", error);

    if (error.code === 4902) {
      // Chain not added to wallet
      try {
        await window.ethereum.request({
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
      } catch (addError) {
        console.error("Add network failed:", addError);
      }
    }
  }
};

export default function Home() {
  const { address, getUserAddress } = useWeb3();

  useEffect(() => {
    switchToAlfajores();
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
