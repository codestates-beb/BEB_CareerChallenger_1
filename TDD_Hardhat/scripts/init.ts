import { ethers } from "hardhat";

async function main() {
    const PARKt_ADDRESS = "0x0142b9d48F9e4084793E80dD9c20751e02189982"
    const PARK_ADDRESS = "0x557f1c23952BD96fe356Af349d1CbC59a3E0Ef4F"

    const _Market = await ethers.getContractFactory("Market");
    console.log("Deploying Market Contract...");
    const Market = await _Market.deploy(PARK_ADDRESS,PARKt_ADDRESS);
    
    const PARK = await ethers.getContractAt("PARK",PARK_ADDRESS)
    const PARKt = await ethers.getContractAt("PARKt",PARKt_ADDRESS)

    console.log("Grant Role... ");
    const MINTER_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
    const TRANSFER_ROLE = "0x8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c"

    await PARK.grantRole(TRANSFER_ROLE,Market.address);
    await PARKt.grantRole(MINTER_ROLE,Market.address);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  