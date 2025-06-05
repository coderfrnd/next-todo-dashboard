import connectDB from '@/lib/mongodb';
import Meeting from '@/models/Meeting';
import { NextResponse } from 'next/server';

// GET /api/meetings/[id] - Get a single meeting
export async function GET(request, { params }) {
  try {
    await connectDB();
    const meeting = await Meeting.findById(params.id);
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
    await connectDB();
    const body = await request.json();
    const meeting = await Meeting.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/meetings/[id] - Delete a meeting
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const meeting = await Meeting.findByIdAndDelete(params.id);
    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 