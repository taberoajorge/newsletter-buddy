import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { readFile } from "fs/promises";
import server from "./db.js";
// @ts-ignore
import fastifyMailer from "fastify-mailer";
import fastifyMultipart from "@fastify/multipart";
import fastifyCors from "@fastify/cors";
import recipientsRoutes from "./routes/recipientsRoutes.js";

import config from "./config.js";

declare module 'fastify' {
  interface FastifyInstance {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    mailer: any;
  }
}

export const app = fastify();

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
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
app.register(recipientsRoutes);

app.get("/", async (_request, reply) => {
  try {
    const file = await readFile("index.html");
    reply.type("text/html").send(file);
  } catch (error) {
    console.error(error);
    reply.code(500).send("Internal server error");
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
