require('dotenv').config();
//process.env.RPC_URL
module.exports = {
    test: async(req,res) => {
        try {
            return res.status(200).send()
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    }
}