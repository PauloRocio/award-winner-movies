import { Inject, Injectable } from '@nestjs/common';
import { GetWinners } from './get-winners.interface';
import { WinnersRepository } from '../../port/winners.repository';
import { TypeORMWinnersRepository } from '../../outbound/repository/typeorm-winner.repository';
import { TypeORMProducersRepository } from '../../outbound/repository/typeorm-producers.repository';
import { ProducersRepository } from '../../port/producers.repository';

type WinnersGrouped = {
  producerId: number;
  interval: number;
  previous: number;
  next: number;
};

type ProducerWins = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

type Response = { min: ProducerWins[]; max: ProducerWins[] };
@Injectable()
export class PerformGetWinners implements GetWinners {
  constructor(
    @Inject(TypeORMWinnersRepository)
    private readonly winnersRepository: WinnersRepository,
    @Inject(TypeORMProducersRepository)
    private readonly producersRepository: ProducersRepository,
  ) {}

  async execute(): Promise<Response> {
    try {
      const awardEditionsAndWinners =
        await this.winnersRepository.findWinners();
      const result = this.buildWinners(awardEditionsAndWinners);
      const winnersGrouped = this.groupWinners(result);

      let min: ProducerWins[] = [];
      let max: ProducerWins[] = [];
      for (const win of winnersGrouped) {
        const producerData = await this.buildProducerAndAwards(win);
        if (!min[0]?.interval || win.interval < min[0]?.interval) {
          min = [];
          min.push(producerData);
          continue;
        }

        if (win.interval === min[0]?.interval) {
          min.push(producerData);
        }

        if (win.interval > max[0]?.interval) {
          max = [];
          max.push(producerData);
          continue;
        }

        if (!max[0]?.interval || win.interval === max[0]?.interval) {
          max.push(producerData);
        }
      }

      return { min, max };
    } catch (err) {
      throw err;
    }
  }

  private buildWinners(
    awardEditionsAndWinners: WinnersRepository.FindWinners.Result,
  ): { producerId: number; years: number[] }[] {
    const result: { producerId: number; years: number[] }[] = [];
    awardEditionsAndWinners.forEach((awardEditionAndWinner) => {
      const producerId = awardEditionAndWinner.producerId;
      const year = awardEditionAndWinner.awardEdition.year;
      const producer = result.find(
        (producer) => producer.producerId === producerId,
      );

      if (!producer) {
        result.push({ producerId, years: [year] });
      } else {
        producer.years.push(year);
      }
    });
    return result;
  }

  private groupWinners(
    winners: { producerId: number; years: number[] }[],
  ): WinnersGrouped[] {
    const result: WinnersGrouped[] = [];
    winners.forEach((producer) => {
      if (producer.years.length <= 1) return;
      const quantityOfWins = producer.years.length;
      const lastPosition = quantityOfWins - 1;

      producer.years.sort().forEach((year, index) => {
        if (index === lastPosition) return;

        result.push({
          producerId: producer.producerId,
          interval: producer.years[index + 1] - year,
          previous: year,
          next: producer.years[index + 1],
        });
      });
    });
    return result;
  }

  private async buildProducerAndAwards(
    win: WinnersGrouped,
  ): Promise<ProducerWins> {
    const producer = await this.producersRepository.findById({
      id: win.producerId,
    });
    return {
      producer: producer.name,
      interval: win.interval,
      previousWin: win.previous,
      followingWin: win.next,
    };
  }
}
