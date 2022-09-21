const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("SimpleStorage", function () {
          let simpleStorageFactory, simpleStorage
          beforeEach(async function () {
              simpleStorageFactory = await ethers.getContractFactory(
                  "SimpleStorage"
              )
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
