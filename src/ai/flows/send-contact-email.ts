
'use server';
/**
 * @fileOverview A flow for sending a contact form email.
 *
 * - sendContactEmail - A function that handles sending the contact email.
 * - ContactFormInput - The input type for the sendContactEmail function.
 * - ContactFormOutput - The return type for the sendContactEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email of the person sending the message.'),
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

// In a real application, this prompt would be more complex and might
// call a tool to send an email via an API like SendGrid or Nodemailer.
// For this prototype, we simulate a successful email send.
const contactFlowPrompt = ai.definePrompt({
  name: 'contactFlowPrompt',
  input: {schema: ContactFormInputSchema},
  output: {schema: ContactFormOutputSchema},
  prompt: `
    You have received a contact form submission.
    Sender Name: {{{name}}}
    Sender Email: {{{email}}}
    Message: {{{message}}}

    Acknowledge receipt and confirm that the email has been "sent" successfully.
    Your entire response must be in the JSON format defined by the output schema.
    Set the success field to true.
  `,
});

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    // In a real app, you would add logic here to send an actual email.
    // For example, using a library like Nodemailer or an API like SendGrid.
    console.log('Simulating sending email with input:', input);
    
    // For now, we will just use the prompt to generate a success response.
    const llmResponse = await contactFlowPrompt(input);
    const output = llmResponse.output();
    if (!output) {
      return {
        success: false,
        message: 'Failed to process the request.',
      };
    }
    // Let's ensure the message is what we want for the user.
    return {
        success: true,
        message: 'Email sent Successfully!',
    };
  }
);
