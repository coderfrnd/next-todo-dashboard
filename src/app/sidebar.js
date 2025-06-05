import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-[220px] bg-[#f5f6fa] text-black border p-6 flex flex-col justify-between min-h-screen">
      <div>
        <div className="font-bold text-2xl mb-8">
          ToDo
          <i className="text-indigo-500 not-italic">i</i>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-indigo-500 font-bold no-underline"
          >
            Meetings
          </Link>
        </nav>
      </div>
      <div className="text-gray-500 font-medium">Log Out</div>
    </aside>
  );
} 