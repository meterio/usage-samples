const meterify = require('meterify').meterify;
const Web3 = require('web3');

const config = require('./config.json');
const web3 = meterify(new Web3(), config.url);

// create account object from private key
const account = web3.eth.accounts.privateKeyToAccount(config.pk);
const { address } = account;

(async function () {
  const mtrgBalance = await web3.eth.getBalance(address);
  const mtrBalance = await web3.eth.getEnergy(address);
  console.log(`Address ${address} has:`);
  console.log(`${parseInt(mtrgBalance) / 1e18} MTRG`);
  console.log(`${parseInt(mtrBalance) / 1e18} MTR`);
})();
