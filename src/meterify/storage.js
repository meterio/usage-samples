const utils = require('../utils');
const { config, web3 } = utils;

const { RLP } = require('@meterio/devkit');

(async function () {
  const data = await web3.eth.getStorageAt(
    '0x616B696e672D6D6F64756c652d61646472657373',
    '0xf10bbd43301ab9ecb93dfb76880a1e0f98a6091d5bfa832668c727ffa033a89f'
  );

  console.log('candidate list raw: ', data);
  let profile = {
    name: 'candidates',
    kind: {
      item: [
        { name: 'addr', kind: new RLP.NullableFixedBlobKind(20) },
        { name: 'name', kind: new RLP.BlobKind() },
        { name: 'pubKey', kind: new RLP.BlobKind() },
        { name: 'ipAddr', kind: new RLP.BlobKind() },
        { name: 'port', kind: new RLP.NumericKind(32) },
        { name: 'commission', kind: new RLP.NumericKind(64) },
        { name: 'timestamp', kind: new RLP.NumericKind(64) },
        { name: 'totalVotes', kind: new RLP.NumericKind(64) },
        { name: 'buckets', kind: { item: new RLP.NullableFixedBlobKind(32) } },
      ],
    },
  };

  let rlp = new RLP(profile);

  let obj = rlp.decode(data);
  console.log('decoded: ', obj);
})();
