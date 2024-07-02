const axios = require('axios');

const blockNumber = 56852510;
const baseUrl = `http://mainnet.meter.io`;

(async () => {
  let transfers = [];
  const res = await axios.get(`${baseUrl}/blocks/${blockNumber}`);
  for (const txhash of res.data.transactions) {
    const receipt = await axios.get(`${baseUrl}/transactions/${txhash}/receipt`);

    if (receipt && receipt.data && receipt.data.outputs) {
      for (const o of receipt.data.outputs) {
        for (const tr of o.transfers) {
          transfers.push(tr);
        }
      }
    }
  }
  console.log(transfers);
})();
