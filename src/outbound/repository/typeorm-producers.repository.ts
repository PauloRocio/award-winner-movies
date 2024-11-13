import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMProducersEntity } from './entity/typeorm-producers.entity';
import { ProducersRepository } from '../../port/producers.repository';

@EntityRepository(TypeORMProducersEntity)
export class TypeORMProducersRepository extends BaseRepository<TypeORMProducersEntity> {
  async saveProducers(
    params: ProducersRepository.SaveProducers.Params,
  ): Promise<ProducersRepository.SaveProducers.Result> {
    return await this.save(params);
  }

  async findById(
    params: ProducersRepository.FindById.Params,
  ): Promise<ProducersRepository.FindById.Result> {
    return await this.findOne(params);
  }

  async findProducersByName(
    name: string,
  ): Promise<ProducersRepository.FindById.Result> {
    return await this.findOne({ where: { name } });
  }
}
