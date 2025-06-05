import MeetingsDashboard from '../MeetingsDashboard';

export default function DashboardPage() {
  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <MeetingsDashboard />
      </div>
    </div>
  );
} 