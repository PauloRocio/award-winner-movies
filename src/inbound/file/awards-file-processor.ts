import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import * as internal from 'stream';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PerformCreateAwardEdition } from '../../use-case/create-award-edition/create-award-edition';
import { CreateAwardEdition } from '../../use-case/create-award-edition/create-award-edition.interface';
import { PerformCreateMovie } from '../../use-case/create-movie/create-movie';
import { CreateMovie } from '../../use-case/create-movie/create-movie.interface';
import { PerformCreateStudios } from '../../use-case/create-studios/create-studios';
import { CreateStudios } from '../../use-case/create-studios/create-studios.interface';
import { CreateProducers } from '../../use-case/create-producers/create-producers.interface';
import { PerformCreateProducers } from '../../use-case/create-producers/create-producers';
import { CreateWinners } from '../../use-case/create-winners/create-winners.interface';
import { PerformCreateWinners } from '../../use-case/create-winners/create-winners';

@Injectable()
export class AwardsFileProcessor implements OnModuleInit {
  private lines: {
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: string;
  }[] = [];

  constructor(
    @Inject(PerformCreateAwardEdition)
    private readonly createAwardEdition: CreateAwardEdition,
    @Inject(PerformCreateMovie)
    private readonly createMovie: CreateMovie,
    @Inject(PerformCreateStudios)
    private readonly createStudios: CreateStudios,
    @Inject(PerformCreateProducers)
    private readonly createProducers: CreateProducers,
    @Inject(PerformCreateWinners)
    private readonly createWinners: CreateWinners,
  ) {}

  async onModuleInit(): Promise<void> {
    const awardsReadableStream = await this.getAwardsFileReadableStream();
    this.registerEvents(awardsReadableStream);
  }

  private getAwardsFileReadableStream(): internal.Transform {
    const movieFilePath = './src/inbound/file/movielist.csv';
    const readableStream = createReadStream(movieFilePath, {
      encoding: 'utf-8',
    }).pipe(
      csvParser({ headers: false, separator: ';', raw: false, skipLines: 1 }),
    );

    return readableStream;
  }

  private registerEvents(awardsReadableStream: internal.Transform) {
    awardsReadableStream.on('data', async (row) => {
      const line: string[] = Object.values(row);
      const [year, title, studiosNames, producersNames, winner] = line;

      this.lines.push({
        year: parseInt(year),
        title,
        studios: studiosNames,
        producers: producersNames,
        winner,
      });
    });

    awardsReadableStream.on('end', async () => {
      console.log('Processamento de arquivo finalizado');
      for (const line of this.lines) {
        const awardEdition = await this.createAwardEdition.execute(line.year);
        const movie = await this.createMovie.execute(
          awardEdition.id,
          line.title,
        );
        await this.createStudios.execute(movie.id, line.studios);
        const producers = await this.createProducers.execute(line.producers);
        if (line.winner === 'yes') {
          await this.createWinners.execute({
            awardEditionId: awardEdition.id,
            producerIds: producers.map((p) => p.id),
          });
        }
      }
    });

    awardsReadableStream.on('error', (error) => {
      console.log(`error: ${error.message}`);
    });
  }
}
