'use server';
/**
 * @fileOverview A flow for sending a contact form email using Nodemailer.
 *
 * - sendContactEmail - A function that handles sending the contact email.
 * - ContactFormInput - The input type for the sendContactEmail function.
 * - ContactFormOutput - The return type for the sendContactEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import nodemailer from 'nodemailer';
import {config} from 'dotenv';

config();

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z
    .string()
    .email()
    .describe('The email of the person sending the message.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function sendContactEmail(
  input: ContactFormInput
): Promise<ContactFormOutput> {
  return await contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    const {name, email, message} = input;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return {
        success: true,
        message: 'Email sent successfully!',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      let errorMessage = 'Failed to send email.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
);