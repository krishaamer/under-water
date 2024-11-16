import { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { parseUnits } from "viem";

const CONTRACT_ADDRESS = "0x7cb7c0484d4f2324f51d81e2368823c20aef8072";

const ABI = [
  // ... your ABI array
];

export default function Offset() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // Addresses and amount to swap
  const fromToken =
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" as `0x${string}`;
  const poolToken =
    "0xD838290e877E0188a4A44700463419ED96c16107" as `0x${string}`;
  const amountToSwap = parseUnits("10", 6); // USDC has 6 decimals

  const { config, error: prepareError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ABI,
    functionName: "autoOffsetExactInToken",
    args: [fromToken, poolToken, amountToSwap],
    chainId: 137, // Polygon Mainnet chain ID
  });

  const {
    data,
    write,
    isLoading,
    isSuccess,
    error: writeError,
  } = useContractWrite(config);

  // Handle network switching
  useEffect(() => {
    const switchNetwork = async () => {
      if (window.ethereum && isConnected) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }], // 0x89 is 137 in hex
          });
        } catch (switchError) {
          const error = switchError as any;
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x89",
                    chainName: "Polygon Mainnet",
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18,
                    },
                    rpcUrls: ["https://polygon-rpc.com/"],
                    blockExplorerUrls: ["https://polygonscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Failed to add Polygon network", addError);
            }
          } else {
            console.error("Failed to switch network", error);
          }
        }
      }
    };

    switchNetwork();
  }, [isConnected]);

  return (
    <div>
      {!isConnected ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={() => disconnect()}>Disconnect</button>
          <button
            onClick={() => write?.()}
            disabled={!write || isLoading || !!prepareError}
          >
            {isLoading ? "Processing..." : "Call autoOffsetExactInToken"}
          </button>
          {isSuccess && (
            <div>
              Transaction Hash:{" "}
              <a
                href={`https://polygonscan.com/tx/${data?.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.hash}
              </a>
            </div>
          )}
          {(prepareError || writeError) && (
            <div style={{ color: "red" }}>
              Error: {prepareError?.message || writeError?.message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
