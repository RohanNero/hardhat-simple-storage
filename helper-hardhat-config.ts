import { network } from "hardhat"

export const developmentChains = ["localhost", "hardhat"]
export const networkConfig = {
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

