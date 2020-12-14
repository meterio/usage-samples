const { cry, Transaction } = require('@meterio/devkit');
const axios = require('axios');
const utils = require('../utils');
const { config } = utils;

// read private key from file
const pkBuffer = Buffer.from(config.pk.replace('0x', ''), 'hex');

let getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
};

(async () => {
  const res = await axios.get(`${config.url}/blocks/best`);
  console.log('Best Block:', res.data);
  const blockRef = res.data.id.substr(0, 18);

  let tx = new Transaction({
    chainTag: 88, // 88 - warringstakes , 82 - mainnet
    blockRef: blockRef, // the first 8 bytes of latest block
    expiration: 48, // blockRefHeight + expiration is the height for tx expire
    clauses: [
      {
        to: config.alice, // alice
        value: '1' + '0'.repeat(17), // 0.1 MTR
        data: '0x',
        token: '00', // 00 - MTR, 01 - MTRG
      },
    ],
    gasPriceCoef: 128, // fixed value
    gas: 21000, // fixed value
    dependsOn: null,
    nonce: getRandomInt(), // random number
  });

  // sign the tx
  const signingHash = cry.blake2b256(tx.encode());
  tx.signature = cry.secp256k1.sign(signingHash, pkBuffer);

  const raw = tx.encode();
  const rawTx = '0x' + raw.toString('hex');
  console.log('Signed Raw Tx: ' + rawTx);
})();
