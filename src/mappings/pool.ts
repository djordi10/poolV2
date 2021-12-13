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
userEntity.pool.push(entity.id)


participantEntity.user = userEntity.id;
participantEntity.balance = evtPoolInfo.params.value;
participantEntity.pool = entity.id;
// entity.participant = participantEntity.id;
entity.member.push(participantEntity.id);
participantEntity.save()
entity.save()
}
//entity.poolParticipant.push(participantEntity.id);

// export function handlePoolCreation(event: PoolCreation): void {}
