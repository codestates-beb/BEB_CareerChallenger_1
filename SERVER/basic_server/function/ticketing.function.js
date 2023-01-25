const testWinner = [
  "0x2eCc77C489e0E3c24A2D53cabC852E20A4A4A88f",
  "0x6DE9c88ECbAa488C63A50b6A516feA6aa7c2F23A",
  "0xBF43445fDc7C9b949E40CCA10415da60a81CeD0b",
  "0xcFa0dcf33d479832f5F2Bd2F1443B61e0CB55e5a",
  "0x840fC5a4bc5af594964319bD5c97F390971c62bd",
  "0x421C3Fa14743954F74cdcEc2b065F6617982e82E",
  "0x413d23d5e295003a3A2218e1A70913738715b11b",
  "0x23F5F1fFDf5cDCE8bbd41e771D44D225b1Bece1b",
  "0xa4965137Cb67D0354D8f6050feB603E8d9C3079c",
  "0x272A27Cf346F28183D544784eBe450Fa16B5b77F",
];

require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(
  `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { randomBytes } = require("crypto");
const { abi } = require("../ABI/Ticketing.json");

const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);

const contract = new web3.eth.Contract(abi, process.env.Ticketing);

const _entry = async (applicant, titleTypeBytes) => {
  const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: await getGasPrice(),
  };

  const result = await contract.methods
    .enter(applicant, titleTypeBytes)
    .send(transaction);
  return result;
};

// 티켓(NFT) 구매하기
const _buyNFT = async (titleTypeBytes, to, url, merkleProof) => {
  const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: await getGasPrice(),
  };
  const result = await contract.methods
    .buyNft(titleTypeBytes, to, url, merkleProof)
    .send(transaction);
  return result;
};

const _draw = () => {
  // todo : 블록체인 네트워크에서 응모리스트 불러오기(event)

  // Example : 응모된 50개 계정 중, 10개 계정 당첨 시나리오
  const addressList = new Array(50)
    .fill(0)
    .map(
      () =>
        web3.eth.accounts.wallet.add(randomBytes(32).toString("hex")).address
    );

  const winner = [];
  // 10명 무작위 추천(중복x)
  let i = 0;
  while (i < 6) {
    let n = Math.floor(Math.random() * addressList.length);
    if (!sameNum(addressList[n])) {
      winner.push(addressList[n]);
      i++;
    }
  }
  function sameNum(n) {
    return winner.find((e) => e === n);
  }

  const testAddress = [
    "0x6DE9c88ECbAa488C63A50b6A516feA6aa7c2F23A",
    "0xCDe2eF0345025e6A6a221B8a62cd5830B93636C7",
    "0x07ebD0917126C710E82B7c73db0C232f25F8605d",
    "0xD871b2086E0e45E603A9F7D6013Ec9E7E5a7eb93",
  ];

  testAddress.map((address) => {
    winner.push(address);
  });

  return winner;
};

// 응모 당첨 여부 확인
const canClaim = async (titleTypeBytes, address, merkleProof) => {
  const result = await contract.methods
    .canClaim(titleTypeBytes, address, merkleProof)
    .call();

  return result;
};

// 당첨자 리스트 Airdrop
const airdrop = async (titleTypeBytes, merkleProof) => {
  const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: await getGasPrice(),
  };
  const result = await contract.methods
    .airdrop(titleTypeBytes, merkleProof)
    .send(transaction);

  return result;
};

const getGasPrice = async () => {
  return await web3.eth.getGasPrice();
};

const merkleTree = (list) => {
  const _merkleTree = new MerkleTree(list, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  return _merkleTree;
};

const merkleTreeRoot = (list) => {
  return (root = merkleTree(list).getHexRoot());
};

const merkleTreeProof = (list, address) => {
  return merkleTree(list).getHexProof(keccak256(address));
};

module.exports = {
  _buyNFT,
  _entry,
  _draw,
  merkleTreeRoot,
  merkleTreeProof,
  canClaim,
  airdrop,
};
