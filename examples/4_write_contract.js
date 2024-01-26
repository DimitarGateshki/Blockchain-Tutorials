const { ethers } = require("ethers");

const INFURA_ID = 'https://mainnet.infura.io/v3/9d23a950b5bc4e4890e50fa1162e1e18'
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = '0x7Ea9629d2bcE89B5ef70F4155542e05FD8142b7f' 
const account2 = '0x71E7659d5BC9dCfDB450D8d752De500aA4d29e48' 

const privateKey1 = 'e3158509e3ae795a4599cf1f16f0e57215b0011cfe33f15d22e1c6df29040e66' 
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = ''
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()