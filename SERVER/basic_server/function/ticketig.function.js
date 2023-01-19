require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);

const {abi} = require('../ABI/Ticketing.json');

const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);

const Contract = new web3.eth.Contract(
    abi,
    process.env.Ticketing
  );

const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: web3.utils.toWei("15", "gwei"),
};