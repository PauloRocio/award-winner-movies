import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { readFileSync } from 'fs';
import { TypeORMAwardEditionsRepository } from '../../../outbound/repository/typeorm-award-editions.repository';
import { AwardEditionsRepository } from '../../../port/awards-editions.repository';
import { TypeORMMoviesRepository } from '../../../outbound/repository/typeorm-movies.repository';
import { MoviesRepository } from '../../../port/movies.repository';
import { TypeORMStudiosRepository } from '../../../outbound/repository/typeorm-studios.repository';
import { StudiosRepository } from '../../../port/studios.repository';
import { TypeORMProducersRepository } from '../../../outbound/repository/typeorm-producers.repository';
import { ProducersRepository } from '../../../port/producers.repository';
import { TypeORMWinnersRepository } from '../../../outbound/repository/typeorm-winner.repository';
import { WinnersRepository } from '../../../port/winners.repository';

@Injectable()
export class DataSeederService implements OnModuleInit, OnModuleDestroy {
  private awardEditionsData: AwardEditionsRepository.Result[] = [];
  private moviesData: MoviesRepository.Result[] = [];
  private studiosData: StudiosRepository.Result[] = [];
  private producersData: ProducersRepository.Result[] = [];

  constructor(
    @Inject(TypeORMAwardEditionsRepository) private awardEditionsRepository: AwardEditionsRepository,
    @Inject(TypeORMMoviesRepository) private moviesRepository: MoviesRepository,
    @Inject(TypeORMStudiosRepository) private studiosRepository: StudiosRepository,
    @Inject(TypeORMProducersRepository) private producersRepository: ProducersRepository,
    @Inject(TypeORMWinnersRepository) private winnersRepository: WinnersRepository
  ) { }

  async onModuleInit() {
    const file = await this.getMoviesFile();
    const lines = this.removeHeader(file);

    for (const line of lines) {
      const [year, title, studios, producers, winner] = line.split(';');

      await this.createAwardEdition(year);
      await this.createMovies(year, title);
      await this.createStudios(title, studios);
      await this.createProducers(title, producers);
      await this.createWinners();

      if (title === undefined) {
        console.log('title is undefined');
        return;
      }
    }
  }

  private async getMoviesFile(): Promise<string> {
    const file = readFileSync('./src/scripts/typeorm/seed/movielist.csv', { encoding: 'utf-8' });
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  }

  private removeHeader(file: string): string[] {
    return file.split('\n').slice(1);
  }

  private async createAwardEdition(year: string): Promise<void> {
    if (!this.awardEditionsData.find((awardEdition) => awardEdition.year === parseInt(year))) {
      const result = await this.awardEditionsRepository.saveAwardEdition({ year: parseInt(year), title: `${year} Award Edition` });

      this.awardEditionsData.push(result);
    }
  }

  private async createMovies(year: string, title: string): Promise<void> {
    const awardEdition = this.awardEditionsData.find((awardEdition) => awardEdition.year === parseInt(year));
    if (!awardEdition) return;
    const result = await this.moviesRepository.saveMovies({ title: title.trim(), awardEditionId: awardEdition.id });
    this.moviesData.push(result);
  }

  private async createStudios(movieTitle: string, studios: string): Promise<any> {
    const studiosArray = studios.split(',');
    for (const studio of studiosArray) {
      const result = await this.studiosRepository.saveStudios({ name: studio.trim(), movieId: this.moviesData.find((movie) => movie.title === movieTitle).id });
      this.studiosData.push(result);
    };
  }

  private async createProducers(movieTitle: string, producers: string): Promise<void> {
    const producersArray = producers.split(/,\s*|(?:\s+and\s*)|(?:\and\s+)/).filter(Boolean);

    for (const producer of producersArray) {
      const result = await this.producersRepository.saveProducers({
        name: producer,
        movieId: this.moviesData.find((movie) => movie.title === movieTitle).id,
        studioId: this.studiosData.find((studio) => studio.movieId === this.moviesData.find((movie) => movie.title === movieTitle).id).id
      });
      this.producersData.push(result);
    };
  }

  private async createWinners(): Promise<void> {
    const winners = this.moviesData.map((movie) => {
      return {
        movieId: movie.id,
        studioId: this.studiosData.find((studio) => studio.movieId === movie.id).id,
        producerId: this.producersData.find((producer) => producer.movieId === movie.id).id,
        awardEditionId: this.awardEditionsData.find((awardEdition) => awardEdition.id === movie.awardEditionId).id
      };
    });

    for (const winner of winners) {
      await this.winnersRepository.saveWinners(winner);
    }
  }
  async onModuleDestroy() {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    // await this.yourEntityRepository.query('DROP TABLE IF EXISTS your_entity');
    // await this.yourEntityRepository.remove(await this.yourEntityRepository.find());
  }
}
