import { EVENTS_TYPES, addEventLog } from "../helpers/log-helper.js";
import { getRecipients } from "../helpers/recipients-helper.js";
import Recipient from '../models/recipients-model.js';

export async function getAllRecipients(req, res) {
  try {
    const recipients = await getRecipients();
    res.json(recipients);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error obtaining the recipients of the database' });
  }
}

export async function addRecipient(req, res) {
  const { name, email, type } = req.body;
  let newRecipient;

  try {
    if (!name || !email || !type) {
      return res.status(400).send({ message: 'Please provide a name, email and type' });
    }

    if (type === 'single') {
      const singleRecipient = email[0];
      newRecipient = await Recipient.create({ name, email: singleRecipient});
      addEventLog(EVENTS_TYPES.USER_SUBSCRIBED, newRecipient.id);
    }
    else if (type === 'multiple') {
      newRecipient = await Recipient.bulkCreate(email.map(email => ({ name, email })));
      newRecipient.forEach(recipient => addEventLog(EVENTS_TYPES.USER_SUBSCRIBED, recipient.id));
    }

    res.json(newRecipient);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding the recipient' });
  }
}