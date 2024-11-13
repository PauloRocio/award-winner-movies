import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeORMWinnersRepository } from '../src/outbound/repository/typeorm-winner.repository';
import { TypeORMProducersRepository } from '../src/outbound/repository/typeorm-producers.repository';
import { TypeORMAwardEditionsRepository } from '../src/outbound/repository/typeorm-award-editions.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let winnersRepository: TypeORMWinnersRepository;
  let producersRepository: TypeORMProducersRepository;
  let awardEditionRepository: TypeORMAwardEditionsRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    winnersRepository = app.get(TypeORMWinnersRepository);
    producersRepository = app.get(TypeORMProducersRepository);
    awardEditionRepository = app.get(TypeORMAwardEditionsRepository);

  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await winnersRepository.delete({});
    await producersRepository.delete({});
    await awardEditionRepository.delete({});
  });

  const makeRequest = async () => {
    return request(app.getHttpServer())
      .get('/winners')
      .expect(200)
      .send();
  };

  it('should return empty array when not find data in DB', async () => {
    const { body } = await makeRequest();

    const expected = {
      min: [],
      max: []
    };

    expect(body).toStrictEqual(expected);
  });

  it('should return empty min and max when anyone wins two times', async () => {
    const { body } = await makeRequest();

    const producerSaved = await producersRepository.save({ name: 'Bo Derek' });
    const winnerSaved = await awardEditionRepository.save({ year: 1990, title: '1990 Award Edition' });
    await winnersRepository.save({ awardEditionId: winnerSaved.id, producerId: producerSaved.id });

    const producerSaved2 = await producersRepository.save({ name: 'Steven spielberg' });
    const winnerSaved2 = await awardEditionRepository.save({ year: 1991, title: '1991 Award Edition' });
    await winnersRepository.save({ awardEditionId: winnerSaved2.id, producerId: producerSaved2.id });


    const expected = {
      min: [],
      max: []
    };

    expect(body).toStrictEqual(expected);
  });

  it('should return winners with min and max time between awards', async () => {
    const firstProducer = await producersRepository.save({ name: 'Bo Derek' });
    const firstAward = await awardEditionRepository.save({ year: 1990, title: '1990 Award Edition' });
    await winnersRepository.save({ awardEditionId: firstAward.id, producerId: firstProducer.id });
    const secondAward = await awardEditionRepository.save({ year: 1991, title: '1991 Award Edition' });
    await winnersRepository.save({ awardEditionId: secondAward.id, producerId: firstProducer.id });

    const secondProducer = await producersRepository.save({ name: 'Steven Spielberg' });
    const thirdAward = await awardEditionRepository.save({ year: 1992, title: '1992 Award Edition' });
    await winnersRepository.save({ awardEditionId: thirdAward.id, producerId: secondProducer.id });
    const fourthAward = await awardEditionRepository.save({ year: 1994, title: '1994 Award Edition' });
    await winnersRepository.save({ awardEditionId: fourthAward.id, producerId: secondProducer.id });

    const { body } = await makeRequest();

    const expected = {
      min: [{ producer: 'Bo Derek', interval: 1, previousWin: 1990, followingWin: 1991 }],
      max: [
        {
          producer: 'Steven Spielberg',
          interval: 2,
          previousWin: 1992,
          followingWin: 1994
        }
      ]
    };

    expect(body).toStrictEqual(expected);
  });
});
