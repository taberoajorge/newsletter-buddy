import { Recipient, pool } from "../db.js";

export async function getRecipients() {
  try {
    const { rows } = await pool.query('SELECT * FROM recipients WHERE subscribed = true');
    const recipients: Recipient[] = rows.map((row: any) => {
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        subscribed: row.subscribed
      };
    });

    return recipients;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los destinatarios de la base de datos');
  }
}