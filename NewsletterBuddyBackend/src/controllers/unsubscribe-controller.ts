import { EVENTS_TYPES, addEventLog } from '../helpers/log-helper.js';
import Recipient from '../models/recipients-model.js';

export async function unsubscribeUser(req, res) {
  const { userId } = req.params;

  try {
    const [updated] = await Recipient.update({ subscribed: false }, {
      where: { id: userId }
    });

    if (updated) {
      addEventLog(EVENTS_TYPES.USER_UNSUBSCRIBED, userId);
      res.json({ message: 'You have successfully unsubscribed from our newsletter.' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error while unsubscribing user:', error);
    res.status(500).json({ message: 'An error occurred while unsubscribing the user.' });
  }
}