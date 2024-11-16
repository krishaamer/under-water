import { useEffect } from "react";
import {
  type BaseError,
  useAccount,
  useWriteContract,
  useSimulateContract,
  useSwitchChain,
} from "wagmi";
import { parseUnits } from "viem";
import { celo } from "wagmi/chains";

// Updated contract address for Celo
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

  // Updated Celo addresses
  const fromToken = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const; // USDC on Celo
  const poolToken = "0x02De4766C272abc10Bc88c220D214A26960a7e92" as const; // Pool token on Celo
  const amountToSwap = parseUnits("1000", 0); // Using the example amount from the contract

  const { data: simulateData, error: prepareError } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "autoOffsetExactInToken",
    args: [fromToken, poolToken, amountToSwap],
    chainId: celo.id,
  });

  const {
    writeContract: write,
    data,
    error: writeError,
    isPending: isLoading,
    isSuccess,
  } = useWriteContract();

  // Updated to switch to Celo network
  useEffect(() => {
    const switchToCelo = async () => {
      if (isConnected && chain?.id !== celo.id) {
        try {
          await switchChainAsync({ chainId: celo.id });
        } catch (error) {
          console.error("Failed to switch network", error);
        }
      }
    };

    switchToCelo();
  }, [isConnected, chain?.id, switchChainAsync]);

  const handleWrite = async () => {
    if (!simulateData?.request) return;

    try {
      await write(simulateData.request);
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
            disabled={
              !simulateData?.request ||
              isLoading ||
              !!prepareError ||
              chain?.id !== celo.id
            }
          >
            {isLoading ? "processing..." : "offset carbon (celo)"}
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
          {(prepareError || writeError) && (
            <div style={{ color: "red" }}>
              Error: {(prepareError || (writeError as BaseError))?.message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
