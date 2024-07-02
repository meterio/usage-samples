const { Driver, SimpleNet } = require('@meterio/flex-framework');
const utils = require('../utils');
const { config } = utils;

(async () => {
  const driver = await Driver.connect(new SimpleNet(config.url));

  const transfers = await driver.filterTransferLogs({ range: { unit: 'block', from: 50000000, to: 50002000 } });
  console.log(transfers);
})();
