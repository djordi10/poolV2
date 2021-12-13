import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import {
FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { User, Pool, PoolParticipant } from "../../generated/schema"

export function handleFundPool(evtPoolInfo: FundPool): void {
let entity = Pool.load(evtPoolInfo.address.toHexString())

if (!entity) {
  entity = new Pool(evtPoolInfo.address.toHexString())
}

let participantEntity = PoolParticipant.load(evtPoolInfo.address.toHexString()+"-"+evtPoolInfo.params.initiator.toHexString())

if (!participantEntity) {
  participantEntity = new PoolParticipant(evtPoolInfo.address.toHexString()+"-"+evtPoolInfo.params.initiator.toHexString())
}

let userEntity = User.load(evtPoolInfo.params.initiator.toHexString())

if (!userEntity) {
  userEntity = new User(evtPoolInfo.params.initiator.toHexString())
  }
entity.save()
let userPool = userEntity.pool;
userPool.push(entity.id);
userEntity.pool = userPool;
  
userEntity.save()


participantEntity.user = userEntity.id;
participantEntity.balance = evtPoolInfo.params.value;
participantEntity.pool = entity.id;
participantEntity.save()
// entity.participant = participantEntity.id;
let poolMember = entity.member;
poolMember.push(participantEntity.id);
entity.member = poolMember;



entity.save()
}
//entity.poolParticipant.push(participantEntity.id);

// export function handlePoolCreation(event: PoolCreation): void {}
