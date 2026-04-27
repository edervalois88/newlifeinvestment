'use server';

import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const LEAD_EMAILS = (process.env.LEAD_EMAIL ?? 'mochoa@nlinvestmentsae.com')
  .split(',')
  .map((email) => email.trim())
  .filter(Boolean);
const FROM_EMAIL =
  process.env.SMTP_FROM_EMAIL ??
  (process.env.SMTP_USER ? `NLI Contact Form <${process.env.SMTP_USER}>` : '');

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendLeadEmail(formData: FormData) {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const subject = (formData.get('subject') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  // Input validation
  if (!name || name.length > MAX_NAME_LENGTH) {
    return { success: false, error: 'invalid_name' };
  }
  if (!email || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return { success: false, error: 'invalid_email' };
  }
  if (!subject || subject.length > MAX_SUBJECT_LENGTH) {
    return { success: false, error: 'invalid_subject' };
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return { success: false, error: 'invalid_message' };
  }

  // TODO: add rate limiting at the middleware/provider level before going to production.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !FROM_EMAIL) {
    console.error('SMTP error: missing SMTP_HOST, SMTP_USER, SMTP_PASS, or SMTP_FROM_EMAIL');
    return { success: false, error: 'send_failed' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: LEAD_EMAILS,
      replyTo: email,
      subject: `[NLI Lead] ${subject}`,
      text: [
        'New lead from NLI Contact Form',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <h2>New lead from NLI Contact Form</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${safeMessage}</p>
      `,
    });
  } catch (error) {
    console.error('SMTP error:', error);
    return { success: false, error: 'send_failed' };
  }

  return { success: true };
}
