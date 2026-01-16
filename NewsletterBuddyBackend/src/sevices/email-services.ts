import schedule from "node-schedule";
import EmailTask from "../models/emailTask-model.js";
import { processEmailTasks } from "./task-service.js";

async function scheduleEmails(recipients, emailData, scheduleDate, mailer) {
    await Promise.all(recipients.map(recipient =>
        EmailTask.create({
            recipientId: recipient.id,
            subject: emailData.subject,
            html: `${emailData.html}<br><br><a href="http://localhost:8000/unsubscribe/${recipient.id}">Unsubscribe</a>`,
            attachment: emailData.file ? emailData.file.originalname : null
        })
    ));

    if (scheduleDate) {
        const scheduleDateTime = new Date(scheduleDate);
        if (isNaN(scheduleDateTime)) {
            throw new Error("Invalid date for scheduling");
        }
        schedule.scheduleJob(scheduleDateTime, () => processEmailTasks(mailer));
    } else {
        await processEmailTasks(mailer);
    }
}

export { scheduleEmails };
