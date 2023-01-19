# Project NFTPARK Deploy Process Command Info

+ STEP(1) : Deploy Contract using by Hardhat.ts

    env $(cat .env) npx hardhat run --network mumbai scripts/deploys/deploy.ts

+ STEP(2) : Verify Solidity Code using by hardhat-etherscan

    env $(cat .env) npx hardhat verify --network mumbai "contract address" "constructor parameters"