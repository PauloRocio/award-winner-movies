import { Inject, Injectable } from '@nestjs/common';
import { TypeORMMoviesRepository } from '../../outbound/repository/typeorm-movies.repository';
import { CreateMovie } from './create-movie.interface';
import { MoviesRepository } from '../../port/movies.repository';

@Injectable()
export class PerformCreateMovie implements CreateMovie {
  constructor(
    @Inject(TypeORMMoviesRepository) private moviesRepository: MoviesRepository,
  ) {}

  async execute(
    awardEditionId: number,
    title: string,
  ): Promise<CreateMovie.Response> {
    const movie = await this.moviesRepository.saveMovies({
      awardEditionId,
      title,
    });
    return movie;
  }
}
