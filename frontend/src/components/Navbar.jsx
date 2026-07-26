import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-white">
            AI Complaint Management
          </h1>

          <p className="text-blue-100 text-sm">
            Quality Assurance Dashboard
          </p>
        </div>

        <div className="flex items-center gap-5">

          <Bell className="text-white cursor-pointer" />

          <div className="flex items-center gap-2">

            <UserCircle size={38} className="text-white" />

            <div className="text-white">

              <p className="font-semibold">Administrator</p>

              <p className="text-xs">Quality Team</p>

            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}