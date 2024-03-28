import {knex as setupKnex, Knex} from 'knex'
import { env } from './env'
import 'dotenv/config'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
  }
};

export class DatabaseConnector{
  server: Knex

  constructor(){
    this.server = setupKnex(config)
  }
  
}
