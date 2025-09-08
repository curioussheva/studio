
import {NextResponse} from 'next/server';
import {sendContactEmail} from '@/ai/flows/send-contact-email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {name, email, message} = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400}
      );
    }

    const result = await sendContactEmail({name, email, message});

    return NextResponse.json(result);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({error: e.message}, {status: 500});
  }
}
