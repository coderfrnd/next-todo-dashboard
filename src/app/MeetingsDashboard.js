"use client"
import { useState } from "react";

const initialMeetings = [
  { agenda: "Sales Presentation", status: "Upcoming", date: "18 Sep 2020", time: "7:10 AM", url: "https://www.todoi.com/1" },
  { agenda: "Skype interview with Pablo", status: "In Review", date: "19 Sep 2020", time: "9:30 AM", url: "https://www.todoi.com/2" },
  { agenda: "Design Thinking Workshop", status: "Cancelled", date: "19 Sep 2020", time: "10:00 AM", url: "https://www.todoi.com/3" },
  { agenda: "Technical interview with Carl", status: "Upcoming", date: "20 Sep 2020", time: "11:45 AM", url: "https://www.todoi.com/4" },
  { agenda: "Meeting with customer", status: "Overdue", date: "21 Sep 2020", time: "15:00 PM", url: "https://www.todoi.com/5" },
  { agenda: "Meeting with Developers", status: "Published", date: "21 Sep 2020", time: "16:40 PM", url: "https://www.todoi.com/6" },
  { agenda: "Technical interview with Rob", status: "In Review", date: "22 Sep 2020", time: "18:00 PM", url: "https://www.todoi.com/7" },
];

export default function MeetingsDashboard() {
  const [meetings] = useState(initialMeetings);
  const [selected, setSelected] = useState([]);

  const allSelected = selected.length === meetings.length && meetings.length > 0;
  const isChecked = (idx) => selected.includes(idx);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(meetings.map((_, idx) => idx));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className=" text-black">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Meetings</h2>
        <button className="bg-indigo-500 text-white rounded-lg px-6 py-2 font-medium text-base hover:bg-indigo-600 transition">Add New</button>
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
            {meetings.map((m, i) => (
              <tr
                key={i}
                className={`border-b last:border-b-0 transition-colors duration-150 ${
                  isChecked(i)
                    ? 'bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="p-4 w-8">
                  <input
                    type="checkbox"
                    checked={isChecked(i)}
                    onChange={() => handleSelect(i)}
                    aria-label={`Select meeting ${m.agenda}`}
                    className="w-5 h-5 accent-indigo-500 rounded focus:outline-none"
                    style={{ boxShadow: 'none' }}
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">{m.agenda}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    m.status === 'Upcoming' ? 'bg-green-100 text-green-700' :
                    m.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                    m.status === 'In Review' ? 'bg-yellow-100 text-yellow-700' :
                    m.status === 'Overdue' ? 'bg-rose-100 text-rose-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{m.date}</td>
                <td className="p-4 text-gray-700">{m.time}</td>
                <td className="p-4">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 underline break-all hover:text-indigo-700"
                  >
                    {m.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx global>{`
        input[type='checkbox']:focus {
          outline: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
} 