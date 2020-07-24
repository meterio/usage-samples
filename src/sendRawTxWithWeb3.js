const meterify = require('meterify').meterify;
const Web3 = require('web3');

const config = require('./config.json');
const web3 = meterify(new Web3(), config.url);

web3.eth.accounts.wallet.add(config.pk);

const rawTx = '0x..........'; // the raw hex you got from packRawTx

(async () => {
  const receipt = await web3.eth.sendSignedTransaction(rawTx);
  console.log('Receipt:', receipt);
})();
