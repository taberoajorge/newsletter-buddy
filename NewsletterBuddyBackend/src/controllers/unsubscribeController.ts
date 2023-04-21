import { FastifyRequest, FastifyReply } from 'fastify';
import { pool } from '../db.js';

interface UnsubscribeParams {
  userId: string;
}

export async function unsubscribeUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as UnsubscribeParams;

  try {
    const { rowCount } = await pool.query('UPDATE recipients SET subscribed = false WHERE id = $1', [userId]);

    if (rowCount === 0) {
      return reply.status(404).send({ message: 'User not found' });
    }

    return reply.send({ message: 'You have successfully unsubscribed from our newsletter.' });
  } catch (error) {
    console.error('Error while unsubscribing user:', error);
    reply.status(500).send({ message: 'An error occurred while unsubscribing the user.' });
  }
}
