import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;

//   newOptions.host = 'database_ignite'; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// });

export default async (host = 'database_ignite'): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  const configDatabase = Object.assign(defaultOption, {
    host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
    database:
      process.env.NODE_ENV === 'test' ? 'rentx_test_2' : defaultOption.database,
  });

  // console.log('configDatabase', configDatabase);

  return createConnection(configDatabase);
};
