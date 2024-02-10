import { EVENTS_TYPES, addEventLog } from "../helpers/log-helper.js";
import EmailTask from "../models/emailTask-model.js";
import Recipient from "../models/recipients-model.js";

async function sendEmailToRecipient(task, mailer) {
    const recipient = await Recipient.findByPk(task.recipientId);
    if (!recipient) {
        throw new Error(`Recipient not found for ID: ${task.recipientId}`);
    }

    await mailer.sendMail({
        from: "newsletter_buddy.u8cpd@simplelogin.com",
        to: recipient.email,
        subject: task.subject,
        html: task.html,
        attachments: [{ filename: task.originalname, content: task.buffer }]
    })

    addEventLog(EVENTS_TYPES.EMAIL_SENT, recipient.id);
    await task.update({ status: 'completed' });
}

async function processEmailTasks(mailer) {
    const tasks = await EmailTask.findAll({ where: { status: 'pending' } });
    for (const task of tasks) {
        await sendEmailToRecipient(task, mailer);
    }
}

export { sendEmailToRecipient, processEmailTasks };
