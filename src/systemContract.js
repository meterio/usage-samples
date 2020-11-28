const devkit= require('@meterio/devkit');
const meterify = require('meterify').meterify;
const Web3 = require('web3');
const config = require('./config.json');
const web3 = meterify(new Web3(), config.url);
const {abi} = devkit;

const isAddress = (val) => {
    return /^0x[0-9a-fA-f]{40}/i.test(val );
};

// input data
// transfer(address recipient, uint256 amount) bool
const transferDef = {
  inputs: [ {name: 'recipient', type:'address' }, {name: 'amount', type:'uint256'} ] ,
  outputs:[ {name: 'result', type:'bool'} ],
  name: 'transfer', type:'function'
}
const transferSig = new abi.Function(transferDef).signature

// event ABI
const transferEvtABI = new abi.Event({
    anonymous: false,
    inputs: [
      { indexed: true, name: '_from', type: 'address' },
      { indexed: true, name: '_to', type: 'address' },
      { indexed: false, name: '_value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
});

const decodeInputs = (data)=>{
    try{
        if (!!data && data.startsWith(transferSig)){
            const paramsData = data.substr(transferSig.length, data.length-transferSig.length+1)
            const decoded = abi.decodeParameters(transferDef.inputs,'0x'+paramsData);
            return decoded;
        }
    }catch(e){
        return undefined;
    }
}

const verifySysContractClause = async (tx, clauseIndex)=>{
    const receipt = await web3.eth.getTransactionReceipt(tx.id);
    if (receipt.outputs.length <= clauseIndex){
        return {verified: false, failReason: 'not enough outputs'};
    }
    if (receipt.reverted){
        return {verified: false, failReason: 'tx reverted'};
    }
    const evts = receipt.outputs[clauseIndex].events;
    for (const evt of evts){
        if (evt.topics[0] === transferEvtABI.signature){
            const decoded = transferEvtABI.decode(evt.data, evt.topics);
            let token = '';
            if (evt.address.toLowerCase() === '0x687A6294D0D6d63e751A059bf1ca68E4AE7B13E2'.toLowerCase()){
                token = 'MTR';
            }
            if (evt.address.toLowerCase() === '0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3'.toLowerCase()){
                token = 'MTRG';
            }
            const txOrigin = tx.origin.toLowerCase();
            const receiptFrom = decoded._from.toLowerCase();
            const receiptTo = decoded._to;
            const receiptAmount = decoded._value;
            if (!isAddress(receiptFrom) || !isAddress(receiptTo) || receiptFrom !== txOrigin){
                continue;
            }
            return {
                verified:true,
                from: receiptFrom,
                to: receiptTo,
                amount: receiptAmount,
                token,
            }
        }
    }

    return {verified: false, failReason: 'no corresponding event'};
}

(async ()=>{
    // use a specific block to demonstrate tx filter & verify for system contract
    const blk = await web3.eth.getBlock(5165321); // 5165321 MTRG sample tx

    // loop through all txs
    for (const txHash of blk.transactions){
        const tx = await web3.eth.getTransaction(txHash);

        // loop through all clauses
        for (const [i, c] of tx.clauses.entries()){
            const decoded = decodeInputs(c.data);
            if (!!decoded && decoded.recipient && decoded.amount){
                const result = await verifySysContractClause(tx, i);
                if (result.verified){
                    // This is a system contract event
                    // Please handle it depends on your accounts
                    console.log(`System contract transfer: ${parseInt(result.amount)/1e18} ${result.token} from ${result.from} to ${result.to}`)
                } else{
                    console.log(`Not a valid system contract transfer, reason: ${result.failReason}`)
                }
           }
        }
    }
})();