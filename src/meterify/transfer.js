const utils = require('../utils');
const { config, web3 } = utils;

web3.eth
  .sendTransaction({
    from: config.address,
    to: config.alice, // alice
    value: '1' + '0'.repeat(17), // 0.1 Token
    // 0000000000 for MTR(meter token)
    // 0000000001 for MTRG(meter governance token)
    data: '0000000001',
  })
  .then((receipt) => {
    console.log('Successfully sent transaction');
    console.log('Receipt: ', receipt);
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
