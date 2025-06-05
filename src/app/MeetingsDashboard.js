"use client"
import { useState, useEffect } from "react";

export default function MeetingsDashboard() {
  const [meetings, setMeetings] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    agenda: "",
    status: "scheduled",
    date: "",
    startTime: "",
    meetingUrl: ""
  });

  // Fetch meetings
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meetings');
      if (!response.ok) throw new Error('Failed to fetch meetings');
      const data = await response.json();
      setMeetings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeeting = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeeting)
      });
      if (!response.ok) throw new Error('Failed to add meeting');
      await fetchMeetings();
      setShowAddModal(false);
      setNewMeeting({
        agenda: "",
        status: "scheduled",
        date: "",
        startTime: "",
        meetingUrl: ""
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMeetings = async () => {
    try {
      await Promise.all(
        selected.map(id => 
          fetch(`/api/meetings/${id}`, { method: 'DELETE' })
        )
      );
      await fetchMeetings();
      setSelected([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const allSelected = selected.length === meetings.length && meetings.length > 0;
  const isChecked = (id) => selected.includes(id);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(meetings.map(m => m._id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="text-center py-8">Loading meetings...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="text-black p-4">
      <div className="flex justify-between items-center mb-8 p-4">
        <h2 className="text-2xl font-semibold">Meetings</h2>
        <div className="space-x-4">
          {selected.length > 0 && (
            <button 
              onClick={handleDeleteMeetings}
              className="bg-red-500 text-white rounded-lg px-6 py-2 font-medium text-base hover:bg-red-600 transition"
            >
              Delete Selected
            </button>
          )}
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-500 text-white rounded-lg px-6 py-2 font-medium text-base hover:bg-indigo-600 transition"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-[#f5f6fa]">
            <tr>
              <th className="p-4 text-left font-medium w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all meetings"
                  className="w-5 h-5 accent-indigo-500 rounded focus:outline-none"
                  style={{ boxShadow: 'none' }}
                />
              </th>
              <th className="p-4 text-left font-medium">Agenda</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-left font-medium">Date of Meeting</th>
              <th className="p-4 text-left font-medium">Start Time</th>
              <th className="p-4 text-left font-medium">Meeting URL</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((m) => (
              <tr
                key={m._id}
                className={`border-b last:border-b-0 transition-colors duration-150 ${
                  isChecked(m._id)
                    ? 'bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="p-4 w-8">
                  <input
                    type="checkbox"
                    checked={isChecked(m._id)}
                    onChange={() => handleSelect(m._id)}
                    aria-label={`Select meeting ${m.agenda}`}
                    className="w-5 h-5 accent-indigo-500 rounded focus:outline-none"
                    style={{ boxShadow: 'none' }}
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">{m.agenda}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    m.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                    m.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    m.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{new Date(m.date).toLocaleDateString()}</td>
                <td className="p-4 text-gray-700">{m.startTime}</td>
                <td className="p-4">
                  <a
                    href={m.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 underline break-all hover:text-indigo-700"
                  >
                    {m.meetingUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Meeting Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Meeting</h3>
            <form onSubmit={handleAddMeeting} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Agenda</label>
                <input
                  type="text"
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newMeeting.status}
                  onChange={(e) => setNewMeeting({...newMeeting, status: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={newMeeting.startTime}
                  onChange={(e) => setNewMeeting({...newMeeting, startTime: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meeting URL</label>
                <input
                  type="url"
                  value={newMeeting.meetingUrl}
                  onChange={(e) => setNewMeeting({...newMeeting, meetingUrl: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                >
                  Add Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        input[type='checkbox']:focus {
          outline: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
} 