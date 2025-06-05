import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/meetings/[id] - Get a single meeting
export async function GET(request, { params }) {
  try {
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/meetings/[id] - Update a meeting
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { agenda, status, date, startTime, meetingUrl } = body;

    const meeting = await prisma.meeting.update({
      where: {
        id: params.id,
      },
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

// DELETE /api/meetings/[id] - Delete a meeting
export async function DELETE(request, { params }) {
  try {
    await prisma.meeting.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 