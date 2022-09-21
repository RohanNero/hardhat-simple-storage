import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { developmentChains } from "../../helper-hardhat-config"
import { SimpleStorage, SimpleStorage__factory } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("SimpleStorage", function () {
          let simpleStorageFactory: SimpleStorage__factory
          let simpleStorage: SimpleStorage
          beforeEach(async function () {
              simpleStorageFactory = (await ethers.getContractFactory(
                  "SimpleStorage"
              )) as SimpleStorage__factory
              simpleStorage = await simpleStorageFactory.deploy()
          })
          it("Should start with a favorite number of 0", async function () {
              const currentValue = await simpleStorage.retrieve()
              const expectedValue = "0"
              // assert or expect
              assert.equal(currentValue.toString(), expectedValue)
              // expect(currentValue.toString()).to.equal(expectedValue)
          })
          it("Should update when we call store", async function () {
              const expectedValue = "7"
              const transactionResponse = await simpleStorage.store(
                  expectedValue
              )
              await transactionResponse.wait(1)

              const currentValue = await simpleStorage.retrieve()
              assert.equal(currentValue.toString(), expectedValue)
          })
          it("Should be able to add person to people array", async function () {
              const expectedValue = "rohan,7"
              const exampleTransaction = await simpleStorage.addPerson(
                  "rohan",
                  7
              )
              await exampleTransaction.wait(1)
              let firstPerson = await simpleStorage.people(0)
              // console.log(`First Person: ${firstPerson}`)
              assert.equal(firstPerson.toString(), expectedValue)
          })
      })
