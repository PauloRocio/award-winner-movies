import { Inject, Injectable } from '@nestjs/common';
import { TypeORMProducersRepository } from '../../outbound/repository/typeorm-producers.repository';
import { CreateProducers } from './create-producers.interface';
import { ProducersRepository } from '../../port/producers.repository';

@Injectable()
export class PerformCreateProducers implements CreateProducers {
  constructor(
    @Inject(TypeORMProducersRepository)
    private producerRepository: ProducersRepository,
  ) {}

  async execute(producers: string): Promise<CreateProducers.Response[]> {
    const producersData: CreateProducers.Response[] = [];
    const producersNamesList = this.getProducersNames(producers);
    for (const producer of producersNamesList) {
      const producerFound = await this.producerRepository.findProducersByName(
        producer.trim(),
      );
      if (producerFound) {
        producersData.push(producerFound);
        continue;
      }
      const result = await this.producerRepository.saveProducers({
        name: producer.trim(),
      });
      producersData.push(result);
    }

    return producersData;
  }

  private getProducersNames(producers: string): string[] {
    return producers.split(/,\s*|(?:\s+and\s*)|(?:\and\s+)/).filter(Boolean);
  }
}
