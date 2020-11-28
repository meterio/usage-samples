const axios = require('axios');

const rawTx = '0x...........'; // the hex you got from packRawTx

(async () => {
  const resp = await axios.post(`${config.url}/transactions`, {
    raw: rawTx,
  });
  const receipt = resp.data;
  console.log('Receipt:', receipt);
})();
