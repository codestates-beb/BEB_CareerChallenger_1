require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);

const {abi} = require('../ABI/PARK.json');

const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);

const contract = new web3.eth.Contract(
    abi,
    process.env.PARK_ERC721
  );

  const _registerTicket = async(titleTypeBytes,cost) => {
    const transaction = {
      from: account.address,
      gas: 19000000,
      gasPrice: await getGasPrice(),
    };
    const result = await contract.methods.registerTicket(titleTypeBytes,cost).send(transaction)

    return result;
}

// 티켓(NFT) 구매하기
const _buyNFT = async(titleTypeBytes,to,url,merkleProof) => {
  const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: await getGasPrice(),
  };
  const result = await contract.methods.buyNft(titleTypeBytes,to,url,merkleProof).send(transaction);
  return result
}

 const getProductionCost= async(title) => {
    return await contract.methods.getProductionCost(title).call();
}
 const isRegisterProduction= async(title) => {
    const cost = await contract.methods.getProductionCost(title).call();
    return cost !=0;
}
 const getSnapshot= async(title) => {
    const result = await contract.methods.getSnapshot(title).call();
    return result;
}

  const getString= async(title) => {
    return web3.utils.soliditySha3({type: 'string', value: title});
}
const getGasPrice = async() => {
  return await web3.eth.getGasPrice()
}
module.exports = {isRegisterProduction,getString,_registerTicket,_buyNFT};
