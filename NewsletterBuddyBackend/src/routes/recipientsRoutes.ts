// src/routes/recipientsRoutes.ts

import { FastifyPluginCallback } from "fastify";
import { getAllRecipients, addRecipient } from "../controllers/recipientsController.js";
import { unsubscribeUser } from "../controllers/unsubscribeController.js";
import { sendEmail } from "../controllers/emailController.js";

const recipientsRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/recipients", getAllRecipients);
  fastify.post("/recipients", addRecipient);
  fastify.post("/send-email", sendEmail);
  fastify.get('/unsubscribe/:userId', unsubscribeUser);
  done();
};

export default recipientsRoutes;
