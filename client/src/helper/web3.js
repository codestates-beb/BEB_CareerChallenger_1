const Web3 = require("web3");
const web3 = new Web3(
  `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
);
const PARK_abi = require('./ABI/PARK.json').abi;


export const isRegisterProduction= async(title) => {
    const contract = new web3.eth.Contract(PARK_abi,process.env.REACT_APP_PARK_ERC721);
    const cost = await contract.methods.getProductionCost(title).call();
    return cost !=0;
}

export const getString= async(title,rank) => {
    const string = `${title} ${rank}`
    const contract = new web3.eth.Contract(PARK_abi,process.env.REACT_APP_PARK_ERC721);
    const result = await contract.methods.getString(string).call();
    return result;
}
