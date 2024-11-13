import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMWinnersEntity } from './entity/typeorm-winners.entity';
import { WinnersRepository } from '../../port/winners.repository';

@EntityRepository(TypeORMWinnersEntity)
export class TypeORMWinnersRepository extends BaseRepository<TypeORMWinnersEntity> {
  async saveWinners(
    params: WinnersRepository.SaveWinners.Params,
  ): Promise<WinnersRepository.SaveWinners.Result> {
    return this.save(params);
  }

  async findWinners(): Promise<WinnersRepository.FindWinners.Result> {
    return this.find({ relations: ['awardEdition'] });
  }

  async findWinnersByProducerIdAndAwardEditionId(
    params: WinnersRepository.FindByProducerAndAward.Winner,
  ): Promise<WinnersRepository.FindByProducerAndAward.Result> {
    return this.findOne(params);
  }
}
