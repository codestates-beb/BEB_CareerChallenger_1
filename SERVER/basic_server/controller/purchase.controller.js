require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`);
const {abi} = require('../ABI/Market.json');

module.exports = {
    publicPurchase : async (req, res) => {
        const data = req.body;
        const owner = data.owner;
        const to = data.to;
        const tokenId = parseInt(data.tokenId);
        const cost = parseInt(data.cost);
        console.log(req.body)
    
        const getGasPrice = async() => {
            return await web3.eth.getGasPrice()
        }  
        const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);
        
        const contract = new web3.eth.Contract(
            abi,
            process.env.Market
        );

        const transaction = {
            from: account.address,
            gas: 19000000,
            gasPrice: await getGasPrice(),
        };
        
        const result = await contract.methods
        .publicPurchase(owner, to, tokenId, cost)
        .send(transaction)
        
        console.log("Purchase 성공")
        res.status(200).send("Purchase 성공");
        return result;
    },
    privatePurchase : async (req, res) => {
        const data = req.body;
        const owner = data.owner;
        const to = data.to;
        const tokenId = parseInt(data.tokenId);
        const cost = parseInt(data.cost);
        
        const getGasPrice = async() => {
            return await web3.eth.getGasPrice()
        }  
        const account = web3.eth.accounts.wallet.add(process.env.NMEMONIC);
    
        console.log(process.env.Market)
        const contract = new web3.eth.Contract(
            abi,
            process.env.Market
        );

        const transaction = {
            from: account.address,
            gas: 19000000,
            gasPrice: await getGasPrice(),
        };
        
        const result = await contract.methods
        .privatePurchase(owner, to, tokenId, cost)
        .send(transaction)
            
        console.log("Purchase 성공")
        res.status(200).send("Purchase 성공");
        return result;
    }
    };




