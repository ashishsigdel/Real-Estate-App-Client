import CryptoJS from "crypto-js";

// Ecryption function
const encryptAccessToken = (accessToken: string) => {
  const secretKey = process.env.CRYPTO_ENCRYPTION_KEY || "";
  const ciphertext = CryptoJS.AES.encrypt(accessToken, secretKey);
  return ciphertext.toString();
};

// Decryption function
const decryptAccessToken = (encryptedAccessToken: string) => {
  const secretKey = process.env.CRYPTO_ENCRYPTION_KEY || "";
  const bytes = CryptoJS.AES.decrypt(encryptedAccessToken, secretKey);
  const decryptedAccessToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedAccessToken;
};

// Chunk array function
const chunkArray = (array: any, size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

export { encryptAccessToken, decryptAccessToken, chunkArray };
