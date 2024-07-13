import {
  OFTCreated as OFTCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PeerSet as PeerSetEvent
} from "../generated/UniversalFactory/UniversalFactory"
import { OFTCreated, OwnershipTransferred, PeerSet } from "../generated/schema"

export function handleOFTCreated(event: OFTCreatedEvent): void {
  let entity = new OFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0
  entity.param1 = event.params.param1
  entity.param2 = event.params.param2
  entity.param3 = event.params.param3
  entity.param4 = event.params.param4

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePeerSet(event: PeerSetEvent): void {
  let entity = new PeerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.eid = event.params.eid
  entity.peer = event.params.peer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
