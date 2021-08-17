import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('123qwe', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_licenses )
        values('${id}', 'admin', 'admin-test','admin@rentx.com.br', '${password}', true, 'now()', 'XXX-XXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com.br', password: '123qwe' });

    const { token } = responseToken.body;
    console.log(token);

    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    });

    expect(response.status).toBe(201);
  });
});
