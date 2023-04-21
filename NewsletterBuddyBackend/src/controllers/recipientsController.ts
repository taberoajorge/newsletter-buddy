// src/controllers/recipientsController.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { Recipient, pool } from "../db.js";
import { getRecipients } from "../helpers/recipients.helper.js";

export async function getAllRecipients(request: FastifyRequest, reply: FastifyReply) {
  try {
    const recipients = await getRecipients();
    return recipients;
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: 'Error al obtener los destinatarios de la base de datos' });
  }
}

export async function addRecipient(request: FastifyRequest, reply: FastifyReply) {
  const { name, email } = request.body as { name: string, email: string };

  try {
    const { rows } = await pool.query('INSERT INTO recipients (name, email) VALUES ($1, $2) RETURNING *', [name, email]);

    const recipient: Recipient = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      subscribed: rows[0].subscribed
    }

    reply.send(recipient);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: 'Error al agregar el destinatario' });
  }
}
