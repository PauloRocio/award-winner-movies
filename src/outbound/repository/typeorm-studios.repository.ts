import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMStudiosEntity } from './entity/typeorm-studios.entity';
import { StudiosRepository } from '../../port/studios.repository';

@EntityRepository(TypeORMStudiosEntity)
export class TypeORMStudiosRepository
    extends BaseRepository<TypeORMStudiosEntity>
{
    async saveStudios(params: StudiosRepository.Params): Promise<StudiosRepository.Result> {
        return await this.save(params);
    }
}
