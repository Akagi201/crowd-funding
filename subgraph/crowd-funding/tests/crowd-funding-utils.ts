import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CampaignContributed,
  CampaignCreated,
  CampaignWithdrawn
} from "../generated/CrowdFunding/CrowdFunding"

export function createCampaignContributedEvent(
  campaignId: BigInt,
  contributor: Address,
  amount: BigInt
): CampaignContributed {
  let campaignContributedEvent = changetype<CampaignContributed>(newMockEvent())

  campaignContributedEvent.parameters = new Array()

  campaignContributedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  campaignContributedEvent.parameters.push(
    new ethereum.EventParam(
      "contributor",
      ethereum.Value.fromAddress(contributor)
    )
  )
  campaignContributedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return campaignContributedEvent
}

export function createCampaignCreatedEvent(
  campaignId: BigInt
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )

  return campaignCreatedEvent
}

export function createCampaignWithdrawnEvent(
  campaignId: BigInt,
  beneficiary: Address,
  amount: BigInt
): CampaignWithdrawn {
  let campaignWithdrawnEvent = changetype<CampaignWithdrawn>(newMockEvent())

  campaignWithdrawnEvent.parameters = new Array()

  campaignWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  campaignWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  campaignWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return campaignWithdrawnEvent
}
