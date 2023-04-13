import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CampaignContributed } from "../generated/schema"
import { CampaignContributed as CampaignContributedEvent } from "../generated/CrowdFunding/CrowdFunding"
import { handleCampaignContributed } from "../src/crowd-funding"
import { createCampaignContributedEvent } from "./crowd-funding-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let campaignId = BigInt.fromI32(234)
    let contributor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newCampaignContributedEvent = createCampaignContributedEvent(
      campaignId,
      contributor,
      amount
    )
    handleCampaignContributed(newCampaignContributedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CampaignContributed created and stored", () => {
    assert.entityCount("CampaignContributed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CampaignContributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "campaignId",
      "234"
    )
    assert.fieldEquals(
      "CampaignContributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contributor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignContributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
