import { ethers } from "hardhat";
import { PARK } from "../typechain-types";

async function main() {
    console.log("hi");
    
    const PARK = await ethers.getContractAt('PARK',"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");

    const tokenAddress = await PARK.token();
    console.log(tokenAddress);
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  