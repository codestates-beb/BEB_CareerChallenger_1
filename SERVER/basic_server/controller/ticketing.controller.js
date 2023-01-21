require('dotenv').config();
const {draw,getString,entry} = require('../function/ticketing.function')
const {isRegisterProduction} = require('../function/parkErc721.function')

//process.env.RPC_URL
module.exports = {
    test: async(req,res) => {
        try {
            return res.status(200).send()
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 응모 api
    entry: async(req,res) => {
        try {
            const { name,title,rank,address } = req.body

            // keccak256(encodePacked(티켓명 + 등급)) 잘못입력 시, 진행x
            const tileTypeBytes = getString(title,rank);
            const isRegisterProduction = await isRegisterProduction(tileTypeBytes)
            
            // 스마트컨트렉트에 등록된 상품이 아니면 진행x
            if(!isRegisterProduction) {
                return res.status(400).send(`Unregistered Production`)
            }

            // 응모하기 : transection to Smart Contract
            const entryResult = await entry(tileTypeBytes,address);
            
            // todo(DB)?! : applicant DB 데이터 저장 구현
            // table info : [id][name(?)][address][title][rank][time(default now)]

            return res.status(200).send()
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    },
    // 추첨 api
    draw: async(req,res) => {
        try {
            const { title,rank } = req.body

            // keccak256(encodePacked(티켓명 + 등급)) 잘못입력 시, 진행x
            const tileTypeBytes = getString(title,rank);
            const isRegisterProduction = await isRegisterProduction(tileTypeBytes)

            // 스마트컨트렉트에 등록된 상품이 아니면 진행x
            if(!isRegisterProduction) {
                return res.status(400).send(`Unregistered Production`)
            }

            // @ array type : 당첨자 리스트 10명(example)
            const winner = draw();
            
            // todo(SM) : 당첨자 리스트 MerkleTree Root Smart Contract에 저장

            // todo(DB) : winners DB 데이터 저장 구현
            // table info : [id][address][title][rank]


            return res.status(200).send()
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    }
}