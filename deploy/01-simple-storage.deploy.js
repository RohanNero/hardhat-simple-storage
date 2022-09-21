const {
    ethers,
    run,
    network,
    deployments,
    getNamedAccounts,
} = require("hardhat")
const { verify } = require("../utils/verify.js")


module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId
    const args = []
    //log(`deployer address: ${deployer}`)
    //log("Deploying contract...")
    const simpleStorage = await deploy("SimpleStorage", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1,
    })
    //log(`Deployed contract to: ${simpleStorage.address}`)
    //log(simpleStorage)

    // verify contract on etherscan only if deployed on a testnet or mainnet
    if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
        await verify(simpleStorage.address, [])
    }

    // get current favorite number and update the value  (only if on development chain)
    if(chainId === 31337) {
        const simpleStorage = await ethers.getContract("SimpleStorage")
        const currentValue = await simpleStorage.retrieve()
        console.log(`Current value is: ${currentValue}`)
        // Update current value
        const transactionResponse = await simpleStorage.store(7)
        await transactionResponse.wait(1)
        const updatedValue = await simpleStorage.retrieve()
        console.log(`Updated value is: ${updatedValue}`)
    }
    
}

module.exports.tags = ["all", "main", "simple"]
