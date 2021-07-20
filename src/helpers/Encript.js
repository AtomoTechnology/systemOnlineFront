import * as crypto from 'crypto-js';
const secret_key =
	'b1bcba59-3bef-4eeb-9d70-333ae3785828-8ba77dd7-92e1-4e8a-b161-1b21334cce58';

export const Encript = (str) => {
	return crypto.AES.encrypt(str, secret_key).toString();
};

export const Decrypt = (str) => {
	return crypto.AES.decrypt(str, secret_key).toString(crypto.enc.Utf8);
};
