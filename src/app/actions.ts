'use server';

import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

const resend = new Resend(process.env.RESEND_API_KEY);
const LEAD_EMAIL = process.env.LEAD_EMAIL ?? 'mochoa@nlinvestmentsae.com';

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

  const { error } = await resend.emails.send({
    from: 'NLI Contact Form <onboarding@resend.dev>',
    to: LEAD_EMAIL,
    replyTo: email,
    subject: `[NLI Lead] ${subject}`,
    html: `
      <h2>New lead from NLI Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return { success: false, error: 'send_failed' };
  }

  return { success: true };
}
