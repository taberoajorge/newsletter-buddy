// src/db.ts

import { FastifyPluginCallback } from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import pg from 'pg';
const { Pool } = pg;


export const pool = new Pool({

  user: 'taberoajorge',
  host: 'localhost',
  database: 'newsletter_buddy',
  password: '123456',
  port: 5432,
});

export interface Recipient {
  email: string;
  id: number;
  name: string;
  subscribed: boolean;
}

const createRecipientsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipients (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        subscribed BOOLEAN DEFAULT true
      );
    `);
    console.log('Recipients table created/checked successfully');
  } catch (error) {
    console.error('Error creating/checking recipients table:', error);
  }
};

const server: FastifyPluginCallback = function (fastify, opts, done) {

  fastify.register(fastifyPostgres, {
    connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/${process.env.POSTGRES_DB}`
  });

  createRecipientsTable();

  done();
};

export default server;
