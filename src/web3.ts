import * as Web3 from 'web3'

export interface EthConnection {
    account: string,
    web3: any
}

export function initWeb3(cb: (accs: string[], initializedWeb3: any) => void): void {
    const newWeb3 = checkAndInstantiateWeb3()

    newWeb3.eth.getAccounts((err: any, accs: any) => {
        if (err !== null) {
            alert("There was an error fetching your accounts.")
            return
        }

        if (accs.length === 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
            return
        }

        cb(accs, newWeb3)
    }
    )
}

function checkAndInstantiateWeb3(): any {
    console.log("Instantiating web3")
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window['web3'] !== 'undefined') {
        console.warn("Using web3 detected from external source.")
        // Use Mist/MetaMask's provider
        return new Web3(window['web3'].currentProvider)
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545.")
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    }
}
