import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockTimeoutPromise = (timeout: number) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await mockTimeoutPromise(1000);
  });

  afterAll(async () => {
    await app.close();
  });

  const makeRequest = async () => {
    return request(app.getHttpServer()).get('/winners').expect(200).send();
  };

  it('should return winners with min and max time between awards', async () => {
    const { body } = await makeRequest();

    const expected = {
      min: [
        {
          followingWin: 1991,
          interval: 1,
          previousWin: 1990,
          producer: 'Joel Silver',
        },
      ],
      max: [
        {
          followingWin: 2015,
          interval: 13,
          previousWin: 2002,
          producer: 'Matthew Vaughn',
        },
      ],
    };

    expect(body).toStrictEqual(expected);
  });
});
