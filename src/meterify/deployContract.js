const fs = require('fs');
const path = require('path');
const utils = require('../utils');
const { config, web3 } = utils;
const contractName = 'Owner';

let proxy_abi = fs.readFileSync(path.join(__dirname, `../../compiled/${contractName}.abi`)).toString();
let proxyAbi = JSON.parse(proxy_abi);

let proxy_bytecode = fs.readFileSync(path.join(__dirname, `../../compiled/${contractName}.bin`)).toString();
let proxyBytecode = '0x' + proxy_bytecode;

proxyInstance = new web3.eth.Contract(proxyAbi);
proxyInstance.options.data = proxyBytecode;

proxyInstance
  .deploy({ arguments: [] })
  .send({ from: config.address, gas: 4700000 })
  .then((newContractInstance) => {
    console.log('Contract deployed at:', newContractInstance.options.address);
  });
