import { useEffect } from "react";
import {
  type BaseError,
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useSimulateContract,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { parseUnits } from "viem";
import { polygon } from "wagmi/chains";

const CONTRACT_ADDRESS = "0x7cb7c0484d4f2324f51d81e2368823c20aef8072";

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
];

export default function Offset() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Addresses and amount to swap
  const fromToken =
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" as `0x${string}`;
  const poolToken =
    "0xD838290e877E0188a4A44700463419ED96c16107" as `0x${string}`;
  const amountToSwap = parseUnits("10", 6); // USDC has 6 decimals

  // Replace usePrepareContractWrite with useSimulateContract
  const { data: simulateData, error: prepareError } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "autoOffsetExactInToken",
    args: [fromToken, poolToken, amountToSwap],
    chainId: polygon.id,
  });

  // Replace useContractWrite with useWriteContract
  const {
    writeContract: write,
    data,
    isError: writeError,
    isPending: isLoading,
    isSuccess,
  } = useWriteContract();

  // Handle network switching
  useEffect(() => {
    if (isConnected) {
      try {
        switchChain({ chainId: polygon.id });
      } catch (error) {
        console.error("Failed to switch network", error);
      }
    }
  }, [isConnected, switchChain]);

  const handleWrite = async () => {
    if (!simulateData?.request) return;

    try {
      await write(simulateData.request);
    } catch (error) {
      console.error("Failed to write contract", error);
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      ) : (
        <>
          <button onClick={() => disconnect()}>Disconnect</button>
          <button
            onClick={handleWrite}
            disabled={!simulateData?.request || isLoading || !!prepareError}
          >
            {isLoading ? "Processing..." : "Call autoOffsetExactInToken"}
          </button>
          {isSuccess && data && (
            <div>
              Transaction Hash:{" "}
              <a
                href={`https://polygonscan.com/tx/${data}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
