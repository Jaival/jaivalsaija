'use server';

import { z } from 'zod';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactFormSchema.parse(data);

    // TODO: Implement actual email sending here
    // Option 1: Use Resend (https://resend.com)
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'your-email@example.com',
    //   subject: validatedData.subject,
    //   html: `<p>From: ${validatedData.name} (${validatedData.email})</p><p>${validatedData.message}</p>`
    // });

    // Option 2: Use Nodemailer
    // Option 3: Use SendGrid
    // Option 4: Use a third-party form service like Formspree or Web3Forms

    // For now, simulate a delay and log in development
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log submission in development mode only
    if (process.env.NODE_ENV === 'development') {
      console.error('📧 Contact form submission (development mode):', {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        messageLength: validatedData.message.length,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: 'Message sent successfully!',
      data: {
        name: validatedData.name,
        email: validatedData.email,
      },
    };
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
        errors: error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      };
    }

    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}
