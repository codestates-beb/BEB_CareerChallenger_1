const testWinner = [
    '0xb5a213F4eA3dCc2da6b6d716FD8B7f248cff36c4',
    '0xF1236877Ed90B4d041c4a16B4AFf1b95a651e236',
    '0xBF43445fDc7C9b949E40CCA10415da60a81CeD0b',
    '0xcFa0dcf33d479832f5F2Bd2F1443B61e0CB55e5a',
    '0x840fC5a4bc5af594964319bD5c97F390971c62bd',
    '0x421C3Fa14743954F74cdcEc2b065F6617982e82E',
    '0x413d23d5e295003a3A2218e1A70913738715b11b',
    '0x23F5F1fFDf5cDCE8bbd41e771D44D225b1Bece1b',
    '0xa4965137Cb67D0354D8f6050feB603E8d9C3079c',
    '0x272A27Cf346F28183D544784eBe450Fa16B5b77F'
  ]

require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const {abi} = require('../ABI/Ticketing.json');

const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);

const contract = new web3.eth.Contract(
    abi,
    process.env.Ticketing
  );

const _entry = async(applicant,titleTypeBytes) => {
    const transaction = {
        from: account.address,
        gas: 19000000,
        gasPrice: await getGasPrice(),
    };

    const result = await contract.methods.enter(applicant,titleTypeBytes).send(transaction)
    return result;
}

 const draw = () => {
    // todo : 블록체인 네트워크에서 응모리스트 불러오기(event)

    // Example : 응모된 50개 계정 중, 10개 계정 당첨 시나리오
    // const addressList = new Array(50)
    // .fill(0)
    // .map(() =>  web3.eth.accounts.wallet.add(randomBytes(32).toString("hex")).address)
  
    // const winner = [];
    // // 10명 무작위 추천(중복x)
    // let i = 0;
    // while (i < 9) {
    //   let n = Math.floor(Math.random() * addressList.length);
    //   if (! sameNum(addressList[n])) {
    //     winner.push(addressList[n]);
    //     i++;
    //   }
    // }
    // function sameNum (n) {
    //   return winner.find((e) => (e === n));
    // }
    
    // const testAddress = "0x272A27Cf346F28183D544784eBe450Fa16B5b77F"
    // winner.push(testAddress)

    // return winner;
    return testWinner
  }


// 응모 당첨 여부 확인
const canClaim = async(titleTypeBytes,address,merkleProof) => {
  const result = await contract.methods.canClaim(titleTypeBytes,address,merkleProof).call();

  return result;
}

const getGasPrice = async() => {
    return await web3.eth.getGasPrice()
}

const merkleTree = (list) => {
  const _merkleTree = new MerkleTree(
      list,
      keccak256,
      { hashLeaves: true, sortPairs: true }
    );
  return _merkleTree
}

const merkleTreeRoot = (list) => {
  return root = merkleTree(list).getHexRoot();
}

const merkleTreeProof = (list,address) => {
  return merkleTree(list).getHexProof(keccak256(address))
}
module.exports = {_entry,draw,merkleTreeRoot,merkleTreeProof,canClaim};