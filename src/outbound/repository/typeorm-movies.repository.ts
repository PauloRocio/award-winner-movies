import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeORMMoviesEntity } from './entity/typeorm-movies.entity';
import { MoviesRepository } from '../../port/movies.repository';

@EntityRepository(TypeORMMoviesEntity)
export class TypeORMMoviesRepository extends BaseRepository<TypeORMMoviesEntity> {
  async saveMovies(
    params: MoviesRepository.Params,
  ): Promise<MoviesRepository.Result> {
    return await this.save(params);
  }
}
