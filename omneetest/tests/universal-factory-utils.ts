import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OFTCreated,
  OwnershipTransferred,
  PeerSet
} from "../generated/UniversalFactory/UniversalFactory"

export function createOFTCreatedEvent(
  param0: Address,
  param1: string,
  param2: string,
  param3: Array<BigInt>,
  param4: BigInt
): OFTCreated {
  let oftCreatedEvent = changetype<OFTCreated>(newMockEvent())

  oftCreatedEvent.parameters = new Array()

  oftCreatedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromString(param1))
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromString(param2))
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "param3",
      ethereum.Value.fromUnsignedBigIntArray(param3)
    )
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam("param4", ethereum.Value.fromUnsignedBigInt(param4))
  )

  return oftCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPeerSetEvent(eid: BigInt, peer: Bytes): PeerSet {
  let peerSetEvent = changetype<PeerSet>(newMockEvent())

  peerSetEvent.parameters = new Array()

  peerSetEvent.parameters.push(
    new ethereum.EventParam("eid", ethereum.Value.fromUnsignedBigInt(eid))
  )
  peerSetEvent.parameters.push(
    new ethereum.EventParam("peer", ethereum.Value.fromFixedBytes(peer))
  )

  return peerSetEvent
}
