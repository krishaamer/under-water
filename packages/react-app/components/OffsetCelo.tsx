import { useState } from "react";
import {
  type BaseError,
  useAccount,
  useWriteContract,
  useSwitchChain,
} from "wagmi";
import { parseUnits } from "viem";
import { celo } from "wagmi/chains";

const CONTRACT_ADDRESS = "0x4242829d15434fea6606cf995f1bed68a18c37d1" as const;

const ABI = [
  {
    inputs: [
      { internalType: "address", name: "_fromToken", type: "address" },
      { internalType: "address", name: "_poolToken", type: "address" },
      { internalType: "uint256", name: "_amountToSwap", type: "uint256" },
    ],
    name: "autoOffsetExactInToken",
    outputs: [
      { internalType: "address[]", name: "tco2s", type: "address[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function OffsetCelo() {
  const { isConnected, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const [isSwitching, setIsSwitching] = useState(false);

  const fromToken = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const; // USDC on Celo
  const poolToken = "0x02De4766C272abc10Bc88c220D214A26960a7e92" as const; // Pool token on Celo
  const amountToSwap = parseUnits("1000", 0); // Example amount from the contract

  const {
    writeContract,
    data,
    error,
    isPending: isLoading,
    isSuccess,
  } = useWriteContract();

  const handleWrite = async () => {
    try {
      if (isConnected && chain?.id !== celo.id) {
        setIsSwitching(true);
        await switchChainAsync({ chainId: celo.id });
        setIsSwitching(false);
      }
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "autoOffsetExactInToken",
        args: [fromToken, poolToken, amountToSwap],
        chainId: celo.id,
      });
    } catch (e) {
      console.error("Failed to write contract", e);
      setIsSwitching(false);
    }
  };

  return (
    <div className="mt-2">
      {isConnected && (
        <>
          <button
            onClick={handleWrite}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading || isSwitching}
          >
            {isLoading || isSwitching
              ? "Processing..."
              : "Offset Carbon (Celo)"}
          </button>
          {isSuccess && data && (
            <a
              href={`https://celoscan.io/tx/${data}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-300 text-white px-4 ml-1 py-2 rounded-2xl hover:bg-blue-700"
            >
              See TX
            </a>
          )}
          {error && (
            <div style={{ color: "red" }}>
              Error: {(error as BaseError)?.message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
