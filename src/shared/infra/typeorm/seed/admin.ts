import { hash } from 'bcryptjs';
import { Connection } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

import createConnection from '../index';

let connection: Connection;
async function create() {
  connection = await createConnection('localhost');

  const id = uuid4();
  const password = await hash('123456', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_licenses )
      values('${id}', 'admin', 'admin-test','admin@rentex.com.br', '${password}', true, 'now()', 'XXX-XXX')`
  );

  connection.close();
}

create().then(() => console.log('User admin created!'));
