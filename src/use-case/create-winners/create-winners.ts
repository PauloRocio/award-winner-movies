import { Inject, Injectable } from '@nestjs/common';
import { CreateWinners } from './create-winners.interface';
import { WinnersRepository } from '../../port/winners.repository';
import { TypeORMWinnersRepository } from '../../outbound/repository/typeorm-winner.repository';

@Injectable()
export class PerformCreateWinners implements CreateWinners {
  constructor(
    @Inject(TypeORMWinnersRepository)
    private winnersRepository: WinnersRepository,
  ) {}

  async execute(
    params: CreateWinners.Params,
  ): Promise<CreateWinners.Response[]> {
    const winnersData: CreateWinners.Response[] = [];

    for (const producerId of params.producerIds) {
      await this.winnersRepository.findWinnersByProducerIdAndAwardEditionId({
        producerId,
        awardEditionId: params.awardEditionId,
      });
      const result = await this.winnersRepository.saveWinners({
        producerId,
        awardEditionId: params.awardEditionId,
      });
      winnersData.push(result);
    }

    return winnersData;
  }
}
