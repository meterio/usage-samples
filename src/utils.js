const path = require('path');
const config = require(path.join(__dirname, 'config.json'));
const meterify = require('meterify').meterify;
const Web3 = require('web3');
const web3 = meterify(new Web3(), config.url);

const account = web3.eth.accounts.privateKeyToAccount(config.pk);
const { address } = account;
config.address = address;
web3.eth.accounts.wallet.add(config.pk);

module.exports = {
  config,
  web3,
};
