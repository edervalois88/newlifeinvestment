'use server';

import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

const LEAD_EMAILS = (process.env.LEAD_EMAIL ?? 'mochoa@nlinvestmentsae.com')
  .split(',')
  .map((email) => email.trim())
  .filter(Boolean);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'NLI Contact Form <onboarding@resend.dev>';

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
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend error: missing RESEND_API_KEY');
    return { success: false, error: 'send_failed' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const { error } = await resend.emails.send({
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

  if (error) {
    console.error('Resend error:', error);
    return { success: false, error: 'send_failed' };
  }

  return { success: true };
}
