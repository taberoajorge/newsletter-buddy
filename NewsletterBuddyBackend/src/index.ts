import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { readFile } from "fs/promises";
import server from "./db.js";
// @ts-ignore
import fastifyMailer from "fastify-mailer";
import fastifyMultipart from "@fastify/multipart";
import fastifyCors from "@fastify/cors";
import recipientsRoutes from "./routes/recipientsRoutes.js";
import { getRecipients } from "./helpers/recipients.helper.js";
import * as schedule from "node-schedule";
import config from "./config.js";

declare module 'fastify' {
  interface FastifyInstance {
    mailer: any;
  }
}

const app = fastify();

app.register(fastifyMailer as any, {
  transport: {
    service: config.SMTP.PROVIDER,
    auth: {
      user: config.SMTP.USER,
      pass: config.SMTP.PASSWORD,
    },
  },
});

app.register(server);
app.register(recipientsRoutes);

app.register(fastifyMultipart, {
  addToBody: true,
});
app.register(fastifyCors, {
  origin: true,
  methods: ["POST"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Content-Length",
    "X-Requested-With",
  ],
  credentials: true, // Permitir cookies
});


app.register(server);

app.get("/", async (request, reply) => {
  try {
    const file = await readFile("index.html");
    reply.type("text/html").send(file);
  } catch (error) {
    console.error(error);
    reply.code(500).send("Internal server error");
  }
});

app.post("/send-email", async (req: FastifyRequest, reply: FastifyReply) => {
  const data = await req.body as any;

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
        const unsubscribeLink = ` http://localhost:5173/unsubscribe/${recipient.id}`;
        const htmlWithUnsubscribe = `${html}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`;

        await app.mailer.sendMail({
          from: 'taberoajorge@gmail.com',
          to: recipient.email,
          subject: subject,
          html: htmlWithUnsubscribe,
          attachments: attachments,
        });
      }
      console.log("Correo enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el correo electrónico", error);
    }
  };


  if (data.scheduleDate) {
    const scheduleDate = new Date(data.scheduleDate);
    schedule.scheduleJob(scheduleDate, async () => {
      await sendEmail();
    });
    reply.send({ message: "Correo programado con éxito" });
  } else {
    await sendEmail();
    reply.send({ message: "Correo enviado con éxito" });
  }
});


app.listen(
  {
    port: config.PORT,
    host: "0.0.0.0",
    backlog: 511,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  }
);
