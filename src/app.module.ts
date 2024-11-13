import { Module, Provider } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TypeORMAwardEditionsEntity,
  TypeORMMoviesEntity,
  TypeORMProducersEntity,
  TypeORMStudiosEntity,
  TypeORMWinnersEntity
} from './outbound/repository/entity';
import {
  TypeORMAwardEditionsRepository, 
  TypeORMMoviesRepository, 
  TypeORMStudiosRepository, 
  TypeORMProducersRepository, 
  TypeORMWinnersRepository
} from './outbound/repository';
import { WinnersController } from './inbound/http/get-winners/get-winners.controller';
import { PerformGetWinners } from './use-case/get-winners/get-winners';
import { AwardsFileProcessor } from './inbound/file/awards-file-processor';
import { PerformCreateAwardEdition } from './use-case/create-award-edition/create-award-edition';
import { PerformCreateMovie } from './use-case/create-movie/create-movie';
import { PerformCreateStudios } from './use-case/create-studios/create-studios';
import { PerformCreateProducers } from './use-case/create-producers/create-producers';
import { PerformCreateWinners } from './use-case/create-winners/create-winners';

const AwardsFileProcessorProvider: Provider = {
  provide: AwardsFileProcessor,
  ...(process.env.MODE !== 'test' ? { useClass: AwardsFileProcessor } : { useValue: null }),
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [TypeORMAwardEditionsEntity, TypeORMMoviesEntity, TypeORMProducersEntity, TypeORMStudiosEntity, TypeORMWinnersEntity],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([TypeORMAwardEditionsRepository, TypeORMMoviesRepository, TypeORMStudiosRepository, TypeORMProducersRepository, TypeORMWinnersRepository]),
  ],
  controllers: [WinnersController],
  providers: [AppService, PerformGetWinners, AwardsFileProcessorProvider, PerformCreateAwardEdition, PerformCreateMovie, PerformCreateStudios, PerformCreateProducers, PerformCreateWinners /*SeederProvider*/],
})
export class AppModule { }
