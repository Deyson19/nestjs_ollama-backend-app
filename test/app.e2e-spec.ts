import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/ (GET)', () => {
    it('should return app status', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
          expect(res.body.message).toBe('App is running');
        });
    });
  });
});

describe('OllamaController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/ollama (POST)', () => {
    it('should reject empty prompt', () => {
      return request(app.getHttpServer())
        .post('/ollama')
        .send({ prompt: '' })
        .expect(400);
    });

    it('should return error when prompt is undefined', () => {
      // Note: Returns 500 because service doesn't handle undefined, only empty string
      return request(app.getHttpServer())
        .post('/ollama')
        .send({})
        .expect(500);
    });
  });

  describe('/ollama/generateText (POST)', () => {
    it('should reject empty prompt', () => {
      return request(app.getHttpServer())
        .post('/ollama/generateText')
        .send({ prompt: '' })
        .expect(400);
    });

    it('should return error when prompt is undefined', () => {
      return request(app.getHttpServer())
        .post('/ollama/generateText')
        .send({})
        .expect(500);
    });
  });
});
