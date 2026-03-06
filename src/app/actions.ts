'use server';

export async function sendLeadEmail(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // In a real application, you'd use Resend, SendGrid or NodeMailer to send this email to mochoa@nlinvestmentsae.com
  console.log('--- NEW LEAD FORM SUBMISSION ---');
  console.log(`To: mochoa@nlinvestmentsae.com`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('--------------------------------');

  return { success: true };
}
