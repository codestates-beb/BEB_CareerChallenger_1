import { ethers,upgrades } from "hardhat";

async function main() {
  // myContract = await MyContract.connect(acc1).deploy(1000);
  
  const _PARKt = await ethers.getContractFactory("PARKt");
  console.log("Deploying PARKt ERC20...");
  const PARKt = await upgrades.deployProxy(_PARKt,{kind:'uups'});
  console.log("PARKt deployed to :" + PARKt.address); // :0x0142b9d48F9e4084793E80dD9c20751e02189982

  const _PARK = await ethers.getContractFactory("PARK");
  console.log("Deploying PARK ERC721...");
  const PARK = await upgrades.deployProxy(_PARK,[PARKt.address],{kind:'uups'})
  console.log("PARK deployed to :" + PARK.address); // :0x557f1c23952BD96fe356Af349d1CbC59a3E0Ef4F

  await PARKt.initNft(PARK.address);

  const _Ticketing = await ethers.getContractFactory("Ticketing");
  console.log("Deploying Ticketing Contract...");
  const Ticketing = await _Ticketing.deploy(PARKt.address,PARK.address);
  console.log("Ticketing deployed to :" + Ticketing.address); // :0xbeeB8FBC2abc21E3C5FedD6654939De4F3A2d243

  const _Market = await ethers.getContractFactory("Market");
  console.log("Deploying Market Contract...");
  const Market = await _Market.deploy(PARK.address,PARKt.address);
  console.log("Market deployed to :" + Market.address); // :0x0Df3f1D25B6a303563DA83f40F2eD6Aa62989D82

  console.log("Grant Role... ");
  const MINTER_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
  const TRANSFER_ROLE = "0x8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c"
  await PARK.grantRole(MINTER_ROLE,Ticketing.address);
  await PARKt.grantRole(MINTER_ROLE,PARK.address)

  await PARK.grantRole(TRANSFER_ROLE,Market.address);
  await PARKt.grantRole(MINTER_ROLE,Market.address);

  console.log("Nice Deployed ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
