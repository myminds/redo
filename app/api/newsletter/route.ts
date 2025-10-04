import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Here you would typically save to database or send to email service
    // For now, we'll just log it
    console.log('Newsletter subscription:', email);

    // Redirect back to the page with success message
    return NextResponse.redirect(new URL('/?subscribed=true', request.url));
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.redirect(new URL('/?error=true', request.url));
  }
}
