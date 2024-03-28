// db.ts

import { Client, PoolClient } from 'pg';

// Define your PostgreSQL database connection configuration
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'default',
  password: '123',
  port: 5432, 
};

const client = new Client(dbConfig);

client.connect(err => {
    if (err) {
      console.error('Failed to connect to PostgreSQL database', err);
    } else {
      console.log('Connected to PostgreSQL database');
    }
  });

export { client };
