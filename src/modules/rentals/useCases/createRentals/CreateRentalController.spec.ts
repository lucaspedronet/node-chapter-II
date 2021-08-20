import { hash } from 'bcryptjs';
import { add } from 'date-fns';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create Rental Controller', () => {
  const dayAdd24Hours = add(new Date(), { minutes: 1441 }); // 1h e 1min
  const carIdOne = uuidV4();
  const carIdTow = uuidV4();
  const userIdOne = uuidV4();
  const userIdTow = uuidV4();
  const categoryId = uuidV4();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);
    await connection.query(
      `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_licenses )
        values('${userIdOne}', 'admin', 'admin-test','admin@rentx.com.br', '${password}', false, 'now()', 'XXX-XXX')`
    );
    await connection.query(
      `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_licenses )
        values('${userIdTow}', 'Lucas Pedro', 'lucas-pedro','lucas@rentx.com.br', '${password}', false, 'now()', 'fake-XXX')`
    );

    await connection.query(
      `INSERT INTO CATEGORIES(id, name, description, created_at, updated_at)
        values('${categoryId}', 'Test-driver', 'Categoria do veívulo Hat', 'now()', 'now()')`
    );

    await connection.query(
      `INSERT INTO CARS(id, name, description, daily_rate, "available", license_plate, fine_amount, brand, category_id, created_at)
        values('${carIdOne}', 'Audi A1', 'Carro moderno e confortável', 150, true, 'XXX-2112', 50, 'AUDIO', '${categoryId}', 'now()')`
    );

    await connection.query(
      `INSERT INTO CARS(id, name, description, daily_rate, "available", license_plate, fine_amount, brand, category_id, created_at)
        values('${carIdTow}', 'Toyota SW4', 'Carro com maior espaço', 150, true, 'hillux-2021', 70, 'TOYOTA', '${categoryId}', 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should create new rental', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com.br', password: 'admin' });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/rentals')
      .send({
        expectedReturnDate: dayAdd24Hours.toISOString(),
        carId: carIdOne,
      })
      .query({
        userId: userIdOne,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('it should not be possíble to create new Rental with a difference of minim than 24 hours', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'lucas@rentx.com.br', password: 'admin' });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/rentals')
      .send({
        expectedReturnDate: new Date().toISOString(),
        carId: carIdTow,
      })
      .query({
        userId: userIdTow,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toEqual({
      message: 'Invalid return time, in 24 hours!',
    });
    expect(response.status).toBe(400);
  });
});
