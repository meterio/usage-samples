const axios = require('axios');

(async () => {
  const res = await axios.post(`http://c01.meter.io:8669/logs/transfer`, {
    range: { unit: 'block', from: 50000000, to: 50000005 },
  });
  console.log(res.data);
})();
