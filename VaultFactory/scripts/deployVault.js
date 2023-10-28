// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers, run, network} = require("hardhat");
require("dotenv").config()

async function main() {
  const public_key = process.env.PUBLIC_KEY
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

    const [owner] = await ethers.getSigners()
    console.log(owner.address)

  const vFactory = await ethers.getContractFactory("Vault")
  const vault = await vFactory.deploy("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199")
  await vault.waitForDeployment();

  

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${vault.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
