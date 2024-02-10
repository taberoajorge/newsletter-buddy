import { EVENTS_TYPES } from "../helpers/log-helper.js";
import { getRecipients } from "../helpers/recipients-helper.js";
import EventLog from "../models/eventLog-model.js";
import { scheduleEmails } from "../sevices/email-services.js";

export async function sendEmail(req, res) {
  const { subject, html, scheduleDate } = req.body;
  const { file } = req;

  try {
    const recipients = await getRecipients();
    const emailData = { subject, html, file };

    await scheduleEmails(recipients, emailData, scheduleDate, req.mailer);


    const message = scheduleDate ? "Emails scheduled for sending" : "Processing emails";
    res.json({ message });
  } catch (error) {
    console.error("Error in sendEmail:", error);
    res.status(500).send({ message: "Error scheduling email tasks" });
  }
}

export const getSentEmails = async (req, res) => {
  try {
    const tasks = await EventLog.findAll({
      where: {
        eventType: EVENTS_TYPES.EMAIL_SENT
      }
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error in getSentEmails:", error);
    res.status(500).send({ message: "Error getting sent emails" });
  }
}