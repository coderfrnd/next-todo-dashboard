import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/meetings - List all meetings
export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    return NextResponse.json(meetings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/meetings - Create a new meeting
export async function POST(request) {
  try {
    const body = await request.json();
    const { agenda, status, date, startTime, meetingUrl } = body;

    const meeting = await prisma.meeting.create({
      data: {
        agenda,
        status,
        date: new Date(date),
        startTime,
        meetingUrl,
      },
    });

    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 