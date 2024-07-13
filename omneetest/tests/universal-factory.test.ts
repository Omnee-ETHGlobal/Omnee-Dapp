import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { OFTCreated } from "../generated/schema"
import { OFTCreated as OFTCreatedEvent } from "../generated/UniversalFactory/UniversalFactory"
import { handleOFTCreated } from "../src/universal-factory"
import { createOFTCreatedEvent } from "./universal-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let param0 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let param1 = "Example string value"
    let param2 = "Example string value"
    let param3 = [BigInt.fromI32(234)]
    let param4 = BigInt.fromI32(234)
    let newOFTCreatedEvent = createOFTCreatedEvent(
      param0,
      param1,
      param2,
      param3,
      param4
    )
    handleOFTCreated(newOFTCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OFTCreated created and stored", () => {
    assert.entityCount("OFTCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param0",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param1",
      "Example string value"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param2",
      "Example string value"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param3",
      "[234]"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param4",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
