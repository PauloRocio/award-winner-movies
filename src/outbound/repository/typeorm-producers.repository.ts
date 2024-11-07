import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMProducersEntity } from './entity/typeorm-producers.entity';
import { ProducersRepository } from '../../port/producers.repository';

@EntityRepository(TypeORMProducersEntity)
export class TypeORMProducersRepository
    extends BaseRepository<TypeORMProducersEntity>
{
    async saveProducers(params: ProducersRepository.Params): Promise<ProducersRepository.Result> {
        return await this.save(params);
    }
}
