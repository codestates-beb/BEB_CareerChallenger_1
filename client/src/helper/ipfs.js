import { create } from "ipfs-http-client";
const { Buffer } = require("buffer");

const projectId = process.env.REACT_APP_PROJECTID;
const projectSecret = process.env.REACT_APP_PROJECTSECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const createIPFS = async (name, description, image,price) => {
  const _json = {
    name,
    description,
    image,
    attributes: {price}
  };
  const metaData = await client.add(JSON.stringify(_json));

  const metaDataUrl = "https://nftpark.infura-ipfs.io/ipfs/" + metaData.path;
  return metaDataUrl;
};
