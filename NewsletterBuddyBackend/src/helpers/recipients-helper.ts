import Recipient from '../models/recipients-model.js';

export async function getRecipients() {
  try {
    const recipients = await Recipient.findAll({
      where: { subscribed: true }
    })

    if(!recipients || !recipients.length) return;

    return recipients;
  } catch (error) {
    console.error(error);
    throw new Error('Error obtaining the recipients of the database');
  }
}