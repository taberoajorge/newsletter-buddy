// src/db.ts

import { FastifyPluginCallback } from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import pg from 'pg';
import config from './config.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
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
    connectionString: config.DATABASE_URL
  });

  createRecipientsTable();

  done();
};

export default server;
