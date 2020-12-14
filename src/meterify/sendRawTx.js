const utils = require('../utils');
const { web3 } = utils;

const rawTx = '0x..........'; // the raw hex you got from packRawTx

(async () => {
  const receipt = await web3.eth.sendSignedTransaction(rawTx);
  console.log('Receipt:', receipt);
})();
