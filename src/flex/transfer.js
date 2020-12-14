const { Framework, Driver, SimpleNet, SimpleWallet } = require('@meterio/flex-framework');
const utils = require('../utils');
const { config } = utils;

(async () => {
  const wallet = new SimpleWallet();
  // add account by importing private key
  wallet.import(config.pk);

  const driver = await Driver.connect(new SimpleNet(config.url), wallet);
  const flex = new Framework(driver);

  // config tx parameters, e.g. expiration, gasPriceCoef
  driver.txParams.expiration = 18;
  driver.txParams.gasPriceCoef = 128;

  // watch committed tx
  driver.onTxCommit = (txObj) => {
    console.log(txObj);
  };

  const signingService = flex.vendor.sign('tx');

  const cluases = [
    {
      to: config.alice,
      value: '2' + '0'.repeat(18),
      data: '0x',
      token: 1,
      comment: 'Transfer 2 MTRG',
    },
    {
      to: config.alice,
      value: '1' + '0'.repeat(18),
      data: '0x',
      token: 0,
      comment: 'Transfer 1 MTR',
    },
    {
      to: config.bob,
      value: '3' + '0'.repeat(18),
      data: '0x',
      token: 1,
      comment: 'Transfer 3 MTRG',
    },
  ];

  signingService
    .signer(MY_ADDRESS) // Enforce signer
    .gas(21000 * cluases.length) // Set maximum gas
    .comment('');

  signingService.request(cluases).then((result) => {
    console.log(result);
  });
})();
