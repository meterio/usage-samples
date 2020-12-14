const utils = require('../utils');
const { config, web3 } = utils;

(async function () {
  const mtrgBalance = await web3.eth.getBalance(config.address);
  const mtrBalance = await web3.eth.getEnergy(config.address);
  console.log(`Address ${config.address} has:`);
  console.log(`${parseInt(mtrgBalance) / 1e18} MTRG`);
  console.log(`${parseInt(mtrBalance) / 1e18} MTR`);
})();
