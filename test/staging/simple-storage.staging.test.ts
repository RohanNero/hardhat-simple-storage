import { assert, expect } from "chai"
import { network, getNamedAccounts, ethers, deployments } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { SimpleStorage } from "../../typechain-types"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Simple Storage staging test", function () {
          let simpleStorage: SimpleStorage
          let deployer
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              simpleStorage = await ethers.getContract(
                  "SimpleStorage",
                  deployer
              )
              //console.log(simpleStorage.address)
              //console.log(deployer)
          })
          it("allows users to store and retrieve a favorite number and a person struct", async function () {
              await simpleStorage.store(777)
              const expectedValue = await simpleStorage.retrieve()
              //console.log(expectedValue.toString())
              const tx = await simpleStorage.addPerson("rohan", 777)
              await tx.wait()
              const personValue = await simpleStorage.people(0)
              //console.log(personValue)
              const favNum = await simpleStorage.nameToFavoriteNumber("rohan")
              assert.equal(expectedValue.toString(), "777")
              //assert.equal(personValue.toString(), [rohan, 777])
              assert.equal(favNum.toString(), "777")
          })
      })
