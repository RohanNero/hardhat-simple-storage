const { network } = require("hardhat")

const developmentChains = ["localhost", "hardhat"]
const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
    1: {
        name: "mainnet",
    },
}
module.exports = {
    developmentChains,
    networkConfig,
}
