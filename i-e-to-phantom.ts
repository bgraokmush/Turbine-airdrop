import bs58 from 'bs58'
var prompt = require('prompt-sync')();


async function baseToWallet() {
    let base = await prompt('Enter the base58 encoded address: ')
    let decoded = bs58.decode(base)
    console.log('The decoded address is:', decoded)
}


async function walletToBase() {
    let wallet = await prompt('Enter the wallet address: ')
    let encoded = bs58.encode(Buffer.from(wallet))
    console.log('The encoded address is:', encoded)

}

baseToWallet()