import crypto from 'crypto'
import { config } from "dotenv";
config();
	
const algorithm = 'aes-256-cbc'; // algoritmo de cifrado simétrico
const secretKey = process.env.CYPHER_KEY; // clave secreta
const iv = crypto.randomBytes(16); // vector de inicialización aleatorio

export function encrypt(token) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const json = {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
  const strJson = JSON.stringify(json)
  return strJson
}


// const encryptedData = encrypt("Hola mundo")

// console.log(encryptedData)

// const decryptedData = decrypt(encryptedData)

// console.log(decryptedData)


export function decrypt(encryptedDataStr) {
  const encryptedData = JSON.parse(encryptedDataStr)
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(encryptedData.iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encryptedData.encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

//  console.log(`Texto desencriptado: ${decryptedString}`);
