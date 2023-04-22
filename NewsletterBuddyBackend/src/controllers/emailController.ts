// src/controllers/recipientsController.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { getRecipients } from "../helpers/recipients.helper.js";
import * as schedule from "node-schedule";
import { app } from "../index.js";

export async function sendEmail(request: FastifyRequest, reply: FastifyReply) {
  console.log("request.body", request);
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const data = (await request.body) as any;

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const attachments: any[] = [];

  const recipients = await getRecipients();

  const { subject, html } = data;

  if (data.attachments && data.attachments.length > 0) {
    const file = data.attachments[0];
    const filename = file.filename;
    const mimetype = file.mimetype;
    const buffer = file.data;

    attachments.push({
      filename,
      content: buffer,
      contentType: mimetype,
    });
  }

  const sendEmail = async () => {
    try {
      for (const recipient of recipients) {
        const unsubscribeLink = ` http://localhost:8000/unsubscribe/${recipient.id}`;
        const htmlWithUnsubscribe = `${html}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`;

        await app.mailer.sendMail({
          from: "taberoajorge@gmail.com",
          to: recipient.email,
          subject: subject,
          html: htmlWithUnsubscribe,
          attachments: attachments,
        });
      }
      console.log("email sent");
    } catch (error) {
      console.error("error sending email", error);
    }
  };

  if (data.scheduleDate) {
    const scheduleDate = new Date(data.scheduleDate);
    schedule.scheduleJob(scheduleDate, async () => {
      await sendEmail();
    });
    reply.send({ message: "email scheduled" });
  } else {
    await sendEmail();
    reply.send({ message: "email sent" });
  }
}
