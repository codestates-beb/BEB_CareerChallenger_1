require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);

const {abi} = require('../ABI/PARK.json');

const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);

const Contract = new web3.eth.Contract(
    abi,
    process.env.PARK_ERC721
  );


export const getProductionCost= async(title) => {
    return await Contract.methods.getProductionCost(title).call();
}
export const isRegisterProduction= async(title) => {
    const cost = await Contract.methods.getProductionCost(title).call();
    return cost !=0;
}
export const getSnapshot= async(title) => {
    const result = await Contract.methods.getSnapshot(title).call();
    return result;
}


  export const getString= async(title,rank) => {
    const string = `${title} ${rank}`
    const result = web3.utils.encodePacked(
        {value: string, type: 'string'},
      );

    return web3.utils.soliditySha3(result);
}