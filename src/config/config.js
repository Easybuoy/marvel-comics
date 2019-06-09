import md5 from "md5";
import dotenv from "dotenv";
dotenv.config();

const getUrlDetails = () => {
  let baseUrl = "https://gateway.marvel.com";
  let timeStamp = new Date().getTime();
  let privateKey = process.env.REACT_APP_PRIVATE_KEY;
  let publicKey = process.env.REACT_APP_PUBLIC_KEY;
  let combinedKeys = `${timeStamp}${privateKey}${publicKey}`;
  let hash = md5(combinedKeys);

  return {
    baseUrl,
    timeStamp,
    publicKey,
    hash
  };
};

export { getUrlDetails };
