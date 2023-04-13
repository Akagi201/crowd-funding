import {
  CampaignContributed as CampaignContributedEvent,
  CampaignCreated as CampaignCreatedEvent,
  CampaignWithdrawn as CampaignWithdrawnEvent
} from "../generated/CrowdFunding/CrowdFunding"
import {
  CampaignContributed,
  CampaignCreated,
  CampaignWithdrawn
} from "../generated/schema"

export function handleCampaignContributed(
  event: CampaignContributedEvent
): void {
  let entity = new CampaignContributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.contributor = event.params.contributor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignWithdrawn(event: CampaignWithdrawnEvent): void {
  let entity = new CampaignWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.beneficiary = event.params.beneficiary
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
