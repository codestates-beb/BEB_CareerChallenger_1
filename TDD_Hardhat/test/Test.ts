import { ethers } from "hardhat";
import { PARK } from "../typechain-types";

describe("test NFT PARK Contract", async() => {
    console.log("hi");
    
    const PARK = await ethers.getContractAt('PARK',"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");

    const tokenAddress = await PARK.token();
    console.log(tokenAddress);
    
})