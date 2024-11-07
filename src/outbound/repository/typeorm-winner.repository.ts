import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMWinnersEntity } from './entity/typeorm-winners.entity';
import { WinnersRepository } from '../../port/winners.repository';

@EntityRepository(TypeORMWinnersEntity)
export class TypeORMWinnersRepository
    extends BaseRepository<TypeORMWinnersEntity>
{
    async saveWinners(params: WinnersRepository.Params): Promise<WinnersRepository.Result> {
        return await this.save(params);
    }
}
