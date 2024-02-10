import EventLog from "../models/eventLog-model.js";

export const EVENTS_TYPES = Object.freeze({
  EMAIL_SCHEDULED: "EMAIL_SCHEDULED",
  EMAIL_SENT: "EMAIL_SENT",
  USER_UNSUBSCRIBED: "USER_UNSUBSCRIBED",
  USER_SUBSCRIBED: "USER_SUBSCRIBED",
});

export async function addEventLog(eventType: string, recipientId: number, details = ""): Promise<void> {
  await EventLog.create({
    eventType,
    recipientId,
    details,
  });
}