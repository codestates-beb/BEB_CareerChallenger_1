require('dotenv').config();
const {db} = require('../sequelize/models');
const {_draw,_entry,merkleTreeRoot,merkleTreeProof,canClaim} = require('../function/ticketing.function')
const {isRegisterProduction,getString,_registerTicket,_buyNFT} = require('../function/parkErc721.function')

//process.env.RPC_URL
module.exports = {
    test: async(req,res) => {
        try {
            return res.status(200).send(winners)
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 상품(티켓)원가 가격 등록
    registerTicket: async(req,res) => {
        try {
            const { title,cost } = req.body;
            const tileTypeBytes = getString(title);
            if(cost.length < 18) {
                cost = cost * 1e18
            }
            const result = await _registerTicket(tileTypeBytes,cost);

            // false tx
            if(result.status === false) {
                return res.status(404).send(`error MESSAGE : FALSE entry Transaction`)
            }
            return res.status(200).send("success register tickent");
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 응모
    entry: async(req,res) => {
        try {
            const { name,title,address } = req.body
            // keccak256(encodePacked(티켓명 + 등급)) 잘못입력 시, 진행x
            const tileTypeBytes = getString(title);
            const _isRegisterProduction = await isRegisterProduction(tileTypeBytes)
            
            // 스마트컨트렉트에 등록된 상품이 아니면 진행x
            if(!_isRegisterProduction) {
                return res.status(400).send(`Unregistered Production`)
            }

            // 응모하기 : transection to Smart Contract
            const entryResult = await _entry(address,tileTypeBytes);

            // false tx
            if(entryResult.status === false) {
                return res.status(404).send(`error MESSAGE : FALSE entry Transaction`)
            }

            // applicant DB 데이터 저장 구현
            // table info : [id][name][address][title][time(default now)]
            const result = await db['applicant'].create({
                name,
                address,
                title,
            })

            return res.status(200).send(result)
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 추첨
    draw: async(req,res) => {
        try {
            const { title } = req.body

            // keccak256(encodePacked(티켓명 + 등급)) 잘못입력 시, 진행x
            const tileTypeBytes = getString(title);
            const isRegisterProduction = await isRegisterProduction(tileTypeBytes)

            // 스마트컨트렉트에 등록된 상품이 아니면 진행x
            if(!isRegisterProduction) {
                return res.status(400).send(`Unregistered Production`)
            }

            // @ array type : 당첨자 리스트 10명(example)
            // draw() = [
            //     '0xb5a213F4eA3dCc2da6b6d716FD8B7f248cff36c4',
            //     '0xF1236877Ed90B4d041c4a16B4AFf1b95a651e236',
            //     '0xBF43445fDc7C9b949E40CCA10415da60a81CeD0b',
            //     '0xcFa0dcf33d479832f5F2Bd2F1443B61e0CB55e5a',
            //     '0x840fC5a4bc5af594964319bD5c97F390971c62bd',
            //     '0x421C3Fa14743954F74cdcEc2b065F6617982e82E',
            //     '0x413d23d5e295003a3A2218e1A70913738715b11b',
            //     '0x23F5F1fFDf5cDCE8bbd41e771D44D225b1Bece1b',
            //     '0xa4965137Cb67D0354D8f6050feB603E8d9C3079c',
            //     '0x272A27Cf346F28183D544784eBe450Fa16B5b77F'
            //   ]
            const winner = draw();
            
            // todo(SM) : 당첨자 리스트 MerkleTree Root Smart Contract에 저장

            // todo(DB) : winners DB 데이터 저장 구현
            // table info : [id][address][title]
            /**
             * DB 저장 example
             * [id][address][title]
             * [0][0xb5a213F4eA3dCc2da6b6d716FD8B7f248cff36c4][IU 콘서트]
             * [1][0xF1236877Ed90B4d041c4a16B4AFf1b95a651e236][IU 콘서트]
             * [2][0xBF43445fDc7C9b949E40CCA10415da60a81CeD0b][IU 콘서트]
             * ....
             * 
             */

            return res.status(200).send()
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 응모 당첨 확인
    isWinner: async(req,res) => {
        try {
            const { title,address } = req.body

            const winners = await db['winners'].findAll({
                where: {
                    title
                },
            });

            // typeof array
            const proof = merkleTreeProof(winners,address);
            const tileTypeBytes = getString(title);

            const result = await canClaim(tileTypeBytes,address,proof);
            return res.status(200).send(result)
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 티켓(NFT) 구매
    buyNFT: async(req,res) => {
        try {
            const { title,to,url } = req.body
            const winners = await db['winners'].findAll({
                where: {
                    title
                },
            });

            // typeof array
            const proof = merkleTreeProof(winners,to);
            const tileTypeBytes = getString(title);
            await _buyNFT(tileTypeBytes,to,url,proof)
            return res.status(200).send("success but ticket")
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
}