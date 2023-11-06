/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { Todo } from '../entities/Todo';
import { User } from '../entities/User';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: ['query', 'error'],
  entities: [Todo, User],
  ssl: false,
  synchronize: true
});

const connectDB = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', getErrorMessage(err));
      // Exit process with failure
      process.exit(1);
    });
};

export default connectDB;
