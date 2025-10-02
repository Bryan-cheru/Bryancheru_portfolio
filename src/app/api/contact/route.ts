// API route for contact form
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    
    // Simulate email sending (you can integrate with SendGrid, Resend, etc.)
    console.log('Contact form submission:', { name, email, message });
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}