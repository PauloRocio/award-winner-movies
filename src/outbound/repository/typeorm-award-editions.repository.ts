import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMAwardEditionsEntity } from './entity/typeorm-award-editions.entity';
import { AwardEditionsRepository } from '../../port/awards-editions.repository';

@EntityRepository(TypeORMAwardEditionsEntity)
export class TypeORMAwardEditionsRepository
    extends BaseRepository<TypeORMAwardEditionsEntity>
{
    async saveAwardEdition(params:AwardEditionsRepository.Params): Promise<AwardEditionsRepository.Result> {
        return await this.save(params);
    }
}
