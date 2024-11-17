import { useEffect } from "react";
import {
  type BaseError,
  useAccount,
  useWriteContract,
  useSwitchChain,
} from "wagmi";
import { parseUnits } from "viem";
import { polygon } from "wagmi/chains";

const CONTRACT_ADDRESS = "0x7cb7c0484d4f2324f51d81e2368823c20aef8072" as const;

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

export default function Offset() {
  const { isConnected, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  // Addresses and amount to swap
  const fromToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" as const;
  const poolToken = "0xD838290e877E0188a4A44700463419ED96c16107" as const;
  const amountToSwap = parseUnits("10", 1);

  const {
    writeContract,
    data: hash,
    error: writeError,
    isPending: isLoading,
    isSuccess,
  } = useWriteContract();

  // Handle network switching
  useEffect(() => {
    const switchToPolygon = async () => {
      if (isConnected && chain?.id !== polygon.id) {
        try {
          await switchChainAsync({ chainId: polygon.id });
        } catch (error) {
          console.error("Failed to switch network", error);
        }
      }
    };

    switchToPolygon();
  }, [isConnected, chain?.id, switchChainAsync]);

  const handleWrite = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "autoOffsetExactInToken",
        args: [fromToken, poolToken, amountToSwap],
        chainId: polygon.id,
      });
    } catch (error) {
      console.error("Failed to write contract", error);
    }
  };

  return (
    <div className="mt-2">
      {isConnected && (
        <>
          <button
            onClick={handleWrite}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading || chain?.id !== polygon.id}
          >
            {isLoading ? "processing..." : "offset carbon (polygon)"}
          </button>
          {isSuccess && hash && (
            <a
              href={`https://polygonscan.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-300 text-white px-4 ml-1 py-2 rounded-2xl hover:bg-blue-700"
            >
              See TX
            </a>
          )}
          {writeError && (
            <div style={{ color: "red" }}>
              Error: {(writeError as BaseError)?.message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
