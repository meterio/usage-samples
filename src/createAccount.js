const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3();

// account creation
const account = web3.eth.accounts.create();

const { privateKey, address } = account;

// write out private key for later reference
console.log('Private Key:', privateKey);
console.log('Address:', address);

console.log(`Successfully created account with address:${address}`);
