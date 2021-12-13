import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory,  PoolByUser } from "../../generated/schema"

// export function bindToUser(address: Address, poolAddress: Address, newBalance: BigInt): void {
//   let id = address.toHexString();
//   let user = User.load(id);
//   if (user == null) {
//     user = new User(id);
//     user.pool = poolAddress;
//     user.balance = BigInt.fromI32(0);
//   }
//   user.balance = user.balance.plus(newBalance)
//   user.save();
// }

// export function loadOrCreatePool(poolAddress: Address): Pool {
//   let pool = Pool.load(poolAddress.toHex())
//   return pool as Pool
// }

export function handleFundPool(evtPoolInfo: FundPool): void {
  let entity = PoolByUser.load(evtPoolInfo.transaction.hash.toHex())
  // let userEntity = User.load(evtPoolInfo.params.initiator.toHex())
  // let poolEntity = Pool.load(evtPoolInfo.address.toHex())
  // let poolWithUserEntity = PoolWithUser.load(evtPoolInfo.address.toHex() + "-" + evtPoolInfo.params.initiator.toHex())
  
  if (!entity) {
    entity = new PoolByUser(evtPoolInfo.transaction.hash.toHex())
  }
  // if (!userEntity) {
  //   userEntity = new User(evtPoolInfo.params.initiator.toHex())
  // }
  // if (!poolEntity) {
  //   poolEntity = new Pool(evtPoolInfo.address.toHex())
  // }
  // if (!poolWithUserEntity) {
  //   poolWithUserEntity = new PoolWithUser(evtPoolInfo.params.initiator.toHex() + "-" + evtPoolInfo.address.toHex())
  // }
  // poolEntity.value = evtPoolInfo.params.value.plus(evtPoolInfo.params.value)

  entity.poolAddress = evtPoolInfo.address;
  entity.user = evtPoolInfo.params.initiator;
  entity.value = evtPoolInfo.params.value;
  
  // poolEntity.users = [userEntity.id]
  // userEntity.totalFundAllPool = userEntity.totalFundAllPool.plus(evtPoolInfo.params.value)
  // userEntity.pool = poolEntity.id
  // poolWithUserEntity.value = poolWithUserEntity.value.plus(evtPoolInfo.params.value);

  entity.save()
  // userEntity.save()
  // poolEntity.save()
  // poolWithUserEntity.save()

  
  // poolEntity.user = evtPoolInfo.params.initiator;
  // poolEntity.value = evtPoolInfo.params.value.plus(evtPoolInfo.params.value)

  // poolEntity.user = [new Member(evtPoolInfo.params.initiator.toHex())]
  // let id = address.toHexString();
  // PoolByUser.load(User)

  // let participantEntity = PoolParticipant.load(evtPoolInfo.params.initiator.toHexString())

  // if (!participantEntity) {
  //   participantEntity = new PoolParticipant(evtPoolInfo.params.initiator.toHexString())
  // }

  // participantEntity.balance = evtPoolInfo.params.value;
  // participantEntity.balance = participantEntity.balance.plus(evtPoolInfo.params.value);
  // participantEntity.user = evtPoolInfo.params.initiator;

  // entity.participant.push(participantEntity.id)

  // participantEntity.save()  

}

// export function handlePoolCreation(event: PoolCreation): void {}