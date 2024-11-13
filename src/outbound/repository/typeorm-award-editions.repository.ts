import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMAwardEditionsEntity } from './entity/typeorm-award-editions.entity';
import { AwardEditionsRepository } from '../../port/awards-editions.repository';

@EntityRepository(TypeORMAwardEditionsEntity)
export class TypeORMAwardEditionsRepository extends BaseRepository<TypeORMAwardEditionsEntity> {
  async saveAwardEdition(
    params: AwardEditionsRepository.SaveAwardEdition.Params,
  ): Promise<AwardEditionsRepository.SaveAwardEdition.Result> {
    return await this.save(params);
  }

  async findWinners(): Promise<AwardEditionsRepository.FindWinners.Result> {
    return await this.find({ relations: ['winners'] });
  }

  async findAwardEditionByYear(
    year: number,
  ): Promise<AwardEditionsRepository.Winners> {
    return await this.findOne({ where: { year } });
  }
}
