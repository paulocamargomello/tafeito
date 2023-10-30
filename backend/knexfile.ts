import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:postegres@postgres:5432/postgres',
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    }
  },
};

export default config;
