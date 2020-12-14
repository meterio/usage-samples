const utils = require('../utils');
const { config, web3 } = utils;

(async function () {
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: config.alice, // alice
      value: '1' + '0'.repeat(17), // 0.1 MTRG
      data: '0000000001', // 0000000000 or empty - MTR, 0000000001 - MTRG
    },
    config.pk
  );

  console.log('Signed Tx: ', signedTx.rawTransaction);
})();
