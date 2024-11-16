import hre from "hardhat";

async function main() {
  const underTheWater = await hre.viem.deployContract("UnderTheWater");
  console.log("UnderTheWater deployed to:", underTheWater.address);
  
  // Only log the relevant deployment information
  console.log("Deployment info:", {
    address: underTheWater.address,
    abi: underTheWater.abi
  });

  // For now, we'll skip waiting for the transaction receipt since we're unsure of the structure
  // and proceed directly to verification
  
  // Verify contract on both Basescan and Blockscout
  console.log("Verifying contract on Basescan...");
  try {
    await hre.run("verify:verify", {
      address: underTheWater.address,
      constructorArguments: [],
      network: "baseSepolia"
    });
  } catch (error) {
    console.error("Basescan verification failed:", error);
  }

  console.log("Verifying contract on Blockscout...");
  try {
    await hre.run("verify:verify", {
      address: underTheWater.address,
      constructorArguments: [],
      network: "baseSepoliaBlockscout"
    });
  } catch (error) {
    console.error("Blockscout verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
