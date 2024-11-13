import { Inject, Injectable } from '@nestjs/common';
import { StudiosRepository } from '../../port/studios.repository';
import { CreateStudios } from './create-studios.interface';
import { TypeORMStudiosRepository } from '../../outbound/repository/typeorm-studios.repository';

@Injectable()
export class PerformCreateStudios implements CreateStudios {
  constructor(
    @Inject(TypeORMStudiosRepository)
    private studioRepository: StudiosRepository,
  ) {}

  async execute(
    movieId: number,
    studios: string,
  ): Promise<CreateStudios.Response[]> {
    const studiosData: CreateStudios.Response[] = [];
    const studiosNamesList = studios.split(',');
    for (const studio of studiosNamesList) {
      const studioFound = await this.studioRepository.findStudiosByName(
        studio.trim(),
      );

      if (studioFound) {
        studiosData.push(studioFound);
        continue;
      }

      const result = await this.studioRepository.saveStudios({
        name: studio.trim(),
        movieId,
      });
      studiosData.push(result);
    }

    return studiosData;
  }
}
