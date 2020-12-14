const utils = require('../utils');
const { config, web3 } = utils;

// web3.eth.accounts.wallet.add(config.pk);
const tx = {
  from: config.address,
  to: config.alice, // Please change this
  value: '100' + '0'.repeat(18), // amount in Wei
  data: '0x',
  token: 1,
};

console.log('Tx:', tx);
(async function () {
  const gas = await web3.eth.estimateGas(tx);
  console.log('Successfully estimated transaction');
  console.log('Estimated gas: ', gas);
})();
