
import {NextResponse, type NextRequest} from 'next/server';
import {
  sendContactEmail,
  type ContactFormInput,
} from '@/ai/flows/send-contact-email';

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormInput = await req.json();
    const result = await sendContactEmail(body);
    if (result.success) {
      return NextResponse.json(
        {message: result.message},
        {status: 200}
      );
    } else {
      return NextResponse.json(
        {message: result.message},
        {status: 500}
      );
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({message: 'Error: ' + errorMessage}, {status: 500});
  }
}

