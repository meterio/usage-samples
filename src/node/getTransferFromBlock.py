import requests

baseUrl = 'http://mainnet.meter.io'
blockNumber =56852510 

res = requests.get(f"{baseUrl}/blocks/{blockNumber}")
print(res.json())
transfers = []
for txhash in res.json()['transactions']:
    receipt = requests.get(f"{baseUrl}/transactions/{txhash}/receipt")
    for o in receipt.json()['outputs']:
        for tr in o['transfers']:
            transfers.append(tr)


for tr in transfers:
    print(f"transfer {int(tr['amount'],16)/1e18} {'MTR' if tr['token'] ==0 else 'MTRG' } from{tr['sender']} to {tr['recipient']} ")