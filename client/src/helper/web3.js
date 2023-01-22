const axios = require("axios")
const Web3 = require("web3");
const web3 = new Web3(
  `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
);
const PARK_abi = require('./ABI/PARK.json').abi;
const Ticketing_abi = require('./ABI/Ticketing.json').abi;
const PARKt_abi = require('./ABI/PARKt.json').abi;

const account = web3.eth.accounts.wallet.add(process.env.REACT_APP_NMEMONIC);

// 상품 등록 확인 여부
export const isRegisterProduction= async(titleTypeBytes) => {
    const contract = new web3.eth.Contract(PARK_abi,process.env.REACT_APP_PARK_ERC721);
    const cost = await contract.methods.getProductionCost(titleTypeBytes).call();
    return cost !=0;
}

// 응모 진행 여부 확인
export const isEnter = async(titleTypeBytes,address) => {
  const contract = new web3.eth.Contract(Ticketing_abi,process.env.REACT_APP_Ticketing);
  const result = await contract.methods.isEntry(titleTypeBytes,address).call();

  return result;
}

// 응모하기
export const entry = async (name,title,address) => {
  const result = await axios.get("http://localhost:5001/ticketing/entry",{
    name,
    title,
    address
  })

  return result;
}

// 응모 당첨 여부 확인
export const canClaim = async(title,address) => {
  const result = await axios.get("http://localhost:5001/ticketing/isWinner",{
    title,
    address
  })
  return result;
}

// 티켓(NFT) 구매하기
export const buyNFT = async(title,to,url) => {
  const result = await axios.get("http://localhost:5001/ticketing/buyNFT",{
    title,
    to,
    url
  })
  return result;
}

// ERC20 토큰 민팅
export const mintingErc20 = async(to,amount) => {
  const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: await getGasPrice(),
};
  const contract = new web3.eth.Contract(PARKt_abi,process.env.REACT_APP_PARKt_ERC20);
  const result = await contract.methods.mint(to,amount).send(transaction);
  return result;
}

export const getString= async(title) => {
  return web3.utils.soliditySha3({type: 'string', value: title});
}

const getGasPrice = async() => {
  return await web3.eth.getGasPrice()
}

// --------------------------------------------------------------------------------//

const { Network, Alchemy, NftExcludeFilters }  = require("alchemy-sdk");
const settings = {
  apiKey: "3C2F0roE0mhCWrJ-q0raCmMqwyQgUJ7_", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const options = {
  contractAddresses : [process.env.REACT_APP_PARK_ERC721],
}

// 내 NFT 조회하기
export const getNFTList = async(walletAddress) => {
  return await alchemy.nft.getNftsForOwner(walletAddress,options);
}