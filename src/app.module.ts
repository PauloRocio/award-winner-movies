import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMMoviesEntity } from './outbound/repository/entity/typeorm-movies.entity';
import { TypeORMAwardEditionsEntity } from './outbound/repository/entity/typeorm-award-editions.entity';
import { TypeORMProducersEntity } from './outbound/repository/entity/typeorm-producers.entity';
import { TypeORMStudiosEntity } from './outbound/repository/entity/typeorm-studios.entity';
import { TypeORMWinnersEntity } from './outbound/repository/entity/typeorm-winners.entity';
import { DataSeederService } from './scripts/typeorm/seed/data-seeder.service';
import { TypeORMAwardEditionsRepository } from './outbound/repository/typeorm-award-editions.repository';
import { TypeORMMoviesRepository } from './outbound/repository/typeorm-movies.repository';
import { TypeORMStudiosRepository } from './outbound/repository/typeorm-studios.repository';
import { TypeORMProducersRepository } from './outbound/repository/typeorm-producers.repository';
import { TypeORMWinnersRepository } from './outbound/repository/typeorm-winner.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/scripts/typeorm/seed/database.sqlite', // Especifica o caminho do arquivo
      entities: [TypeORMAwardEditionsEntity, TypeORMMoviesEntity, TypeORMProducersEntity, TypeORMStudiosEntity, TypeORMWinnersEntity],
      synchronize: true, // Sincroniza as entidades com o banco de dados
    }),
    TypeOrmModule.forFeature([TypeORMAwardEditionsRepository, TypeORMMoviesRepository, TypeORMStudiosRepository, TypeORMProducersRepository, TypeORMWinnersRepository]),
  ],
  controllers: [AppController],
  providers: [AppService, DataSeederService],
})
export class AppModule {}
