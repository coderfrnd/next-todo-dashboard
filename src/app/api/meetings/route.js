import connectDB from '@/lib/mongodb';
import Meeting from '@/models/Meeting';
import { NextResponse } from 'next/server';

// GET /api/meetings - List all meetings
export async function GET() {
  try {
    await connectDB();
    const meetings = await Meeting.find().sort({ date: -1 });
    return NextResponse.json(meetings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/meetings - Create a new meeting
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const meeting = await Meeting.create(body);
    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 