'use client';

import { useState, useEffect } from 'react';
import MeetingForm from '@/components/MeetingForm';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('/api/meetings');
      const data = await response.json();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMeeting = async (formData) => {
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create meeting');

      await fetchMeetings();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleUpdateMeeting = async (formData) => {
    try {
      const response = await fetch(`/api/meetings/${editingMeeting.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update meeting');

      await fetchMeetings();
      setEditingMeeting(null);
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;

    try {
      const response = await fetch(`/api/meetings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete meeting');

      await fetchMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Meeting
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Meeting</h2>
            <MeetingForm
              onSubmit={handleCreateMeeting}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {editingMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Meeting</h2>
            <MeetingForm
              meeting={editingMeeting}
              onSubmit={handleUpdateMeeting}
              onCancel={() => setEditingMeeting(null)}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{meeting.agenda}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(meeting.date).toLocaleDateString()} at {meeting.startTime}
                </p>
                <p className="text-sm text-gray-600">Status: {meeting.status}</p>
                {meeting.meetingUrl && (
                  <a
                    href={meeting.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Join Meeting
                  </a>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingMeeting(meeting)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMeeting(meeting.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 