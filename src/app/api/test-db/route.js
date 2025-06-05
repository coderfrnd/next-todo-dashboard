import connectDB from '@/lib/mongodb';
import Meeting from '@/models/Meeting';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    // Create a test meeting
    const testMeeting = await Meeting.create({
      agenda: "Test Meeting",
      status: "scheduled",
      date: new Date(),
      startTime: "10:00",
      meetingUrl: "https://test.com"
    });
    
    // Delete the test meeting
    await Meeting.findByIdAndDelete(testMeeting._id);
    
    return NextResponse.json({ 
      message: "Database connection successful!", 
      testMeeting 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Database connection failed", 
      details: error.message 
    }, { status: 500 });
  }
} 