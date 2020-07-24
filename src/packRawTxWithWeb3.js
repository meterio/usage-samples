const meterify = require('meterify').meterify;
const Web3 = require('web3');
const config = require('./config.json');
const web3 = meterify(new Web3(), config.url);

(async function () {
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: '0xbf85ef4216340eb5cd3c57b550aae7a2712d48d2', // alice
      value: '1' + '0'.repeat(17), // 0.1 MTRG
      data: '0000000001', // 0000000000 or empty - MTR, 0000000001 - MTRG
    },
    config.pk
  );

  console.log('Signed Raw Tx: ', signedTx.rawTransaction);
})();
