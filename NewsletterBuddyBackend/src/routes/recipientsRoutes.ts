// src/routes/recipientsRoutes.ts

import { FastifyPluginCallback } from "fastify";
import { getAllRecipients, addRecipient } from "../controllers/recipientsController.js";
import { unsubscribeUser } from "../controllers/unsubscribeController.js";

const recipientsRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/recipients", getAllRecipients);
  fastify.post("/recipients", addRecipient);
  fastify.get('/unsubscribe/:userId', unsubscribeUser);
  done();
};

export default recipientsRoutes;
