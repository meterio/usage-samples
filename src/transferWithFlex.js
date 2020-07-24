const {
  Framework,
  Driver,
  SimpleNet,
  SimpleWallet,
} = require('@meterio/flex-framework');

const config = require('./config.json');

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

  const recipient1 = '0xbf85ef4216340eb5cd3c57b550aae7a2712d48d2'; // alice
  const recipient2 = '0xf3dd5c55b96889369f714143f213403464a268a6'; // bob
  const cluases = [
    {
      to: recipient1,
      value: '2' + '0'.repeat(18),
      data: '0x',
      token: 1,
      comment: 'Transfer 2 MTRG',
    },
    {
      to: recipient1,
      value: '1' + '0'.repeat(18),
      data: '0x',
      token: 0,
      comment: 'Transfer 1 MTR',
    },
    {
      to: recipient2,
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
