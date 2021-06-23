const {
  DATABASE_TYPE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

module.exports = {
  name: 'default',
  type: DATABASE_TYPE,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  seeds: ['./src/seeds/config/**/*{.ts,.js}'],
  factories: ['./src/seeds/factories/**/*{.ts,.js}'],
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './src/migrations',
  },
};
