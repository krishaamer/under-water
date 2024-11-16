"use client";

import { useWriteContract } from "wagmi";

const CONTRACT_ADDRESS = "0xec28980605615954f48338c68a5623fd748065cc";
const CONTRACT_ABI = [
  {
    inputs: [],
    name: "executeSequence",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function ContractInteraction() {
  const { data, error, isPending, isSuccess, writeContract } =
    useWriteContract();

  const handleWrite = async () => {
    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "executeSequence",
      });
      console.log("Transaction successful:", result);
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleWrite}
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending ? "processing..." : "buy carbon credits"}
      </button>
      {isSuccess && data && (
        <a
          href={`https://sepolia.basescan.org//tx/${data}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-300 text-white px-4 ml-1 py-2 rounded-2xl hover:bg-blue-700"
        >
          See TX
        </a>
      )}
      {error && <p className="mt-2 text-red-600">error: {error.message}</p>}
    </div>
  );
}
