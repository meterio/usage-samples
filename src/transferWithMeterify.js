const meterify = require('meterify').meterify;
const Web3 = require('web3');
const config = require('./config.json');

const web3 = meterify(new Web3(), config.url);

// create account object from private key
const account = web3.eth.accounts.privateKeyToAccount(config.pk);
const { address } = account;

web3.eth.accounts.wallet.add(config.pk);

web3.eth
  .sendTransaction({
    from: address,
    to: '0x03aa4784c850265fdc4260412c80d2551f329e0c', // alice

    // actual meter = value * 10e-18
    value: '200' + '0'.repeat(18), // 0.1 MTR

    // 0000000000 for MTR(meter token)
    // 0000000001 for MTRG(meter governance token)
    data: '0000000001', // meter token
  })
  .then((receipt) => {
    console.log('Successfully sent transaction');
    console.log('Receipt: ', receipt);
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
