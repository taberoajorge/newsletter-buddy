import express from 'express';
import { getAllRecipients, addRecipient } from '../controllers/recipients-controller.js';
import { unsubscribeUser } from '../controllers/unsubscribe-controller.js';
import { getSentEmails, sendEmail } from '../controllers/email-controller.js';
import multer from 'multer';

const router = express.Router();
export const upload = multer();

router.get('/recipients', getAllRecipients);
router.post('/recipients', addRecipient);
router.post('/send-email', upload.single('attachments'), sendEmail);
router.get('/unsubscribe/:userId', unsubscribeUser);
router.get('/sent-emails', getSentEmails);

export default router;
