require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);
const serverAddress = "0x272A27Cf346F28183D544784eBe450Fa16B5b77F"
const contract721ABI = require('../ABI/Market.json');
const contract721Address = "0x0Df3f1D25B6a303563DA83f40F2eD6Aa62989D82"
const privateKey = process.env.NMEMONIC;

exports.publicListing = async (req, res) => {
    const data = req.body;
    const owner = data.owner;
    const tokenId = parseInt(data.tokenId);
    const cost = parseInt(data.cost);

    const getGasAmount = () => {
        const contract = new web3.eth.Contract(contract721ABI, contract721Address);
        const gasAmount = contract.methods.listing(owner, tokenId, cost).estimateGas({ from: serverAddress });
        return gasAmount;
    };
    
    const callGasAmount = await getGasAmount();
    const gas = Math.round(callGasAmount * 1.3);
    console.log(gas);

    // const contract = new web3.eth.Contract(contract721ABI, contract721Address,{ from: serverAddress });
    // const contractData = contract.methods.listing(owner, tokenId, cost).encodeABI(); //Create the data for token transaction.
    // const rawTransaction = {to: contract721Address, gas: gas, data: contractData,};

    // web3.eth.accounts.signTransaction(rawTransaction, privateKey)
    // .then((signedTx) => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
    // .then((req) => {
    //     console.log("listing 성공");
    //     return res.status(200).send("listing 성공");
    //   })
};


exports.whiteListing = async (req, res) => {
    const data = req.body;
    const owner = data.owner;
    const to = data.to;
    const tokenId = parseInt(data.tokenId);
    const cost = parseInt(data.cost);

    const getGasAmount = () => {
        const contract = new web3.eth.Contract(contract721ABI, contract721Address);
        const gasAmount = contract.methods.whiteListing(owner, to, tokenId, cost).estimateGas({ from: serverAddress });
        return gasAmount;
    };

    const callGasAmount = await getGasAmount();
    const gas = Math.round(callGasAmount * 1.3);
    console.log(gas);

    const contract = new web3.eth.Contract(contract721ABI, contract721Address,{ from: serverAddress });
    const contractData = contract.methods.whiteListing(owner, to, tokenId, cost).encodeABI(); //Create the data for token transaction.
    const rawTransaction = {to: contract721Address, gas: gas, data: contractData,};

    web3.eth.accounts.signTransaction(rawTransaction, privateKey)
    .then((signedTx) => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
    .then((req) => {
        console.log("whiteListing 성공");
        return res.status(200).send("whiteListing 성공");
    })
};

