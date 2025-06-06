import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import {
  LogOut,
  Plus,
  Settings,
  Menu,
  X,
  BookOpen,
  Bell,
  Home,
  Calendar,
  CheckSquare,
} from "lucide-react";
import Button from "../components/ui/Button";
import CreateClassModal from "../components/modals/CreateClass";
import JoinClassModal from "../components/modals/JoinClass";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const mockClasses = [
    {
      id: 1,
      name: "Mathematics 101",
      teacher: "Dr. Smith",
      color: "bg-primary-100",
    },
    {
      id: 2,
      name: "Physics Advanced",
      teacher: "Prof. Johnson",
      color: "bg-secondary-100",
    },
    {
      id: 3,
      name: "English Literature",
      teacher: "Ms. Davis",
      color: "bg-accent-100",
    },
    {
      id: 4,
      name: "Computer Science",
      teacher: "Mr. Wilson",
      color: "bg-success-100",
    },
  ];

  const handleCreateClass = (name, section, subject, room) => {
    console.log("Creating class:", name);
  };

  const handleJoinClass = (classCode) => {
    console.log("Joining class with code:", classCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <BookOpen size={28} className="text-primary-600" />
                <h1 className="text-2xl font-bold text-primary-600">
                  EduClass
                </h1>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Home size={20} />
                <span>Home</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Calendar size={20} />
                <span>Calendar</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <CheckSquare size={20} />
                <span>To-do</span>
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {user?.name?.[0].toUpperCase()}
                    </span>
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-4 py-3">
            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                <Home size={20} />
                Home
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                <Calendar size={20} />
                Calendar
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                <CheckSquare size={20} />
                To-do
              </a>
            </nav>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-gray-600 mt-1">Here are your classes</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              icon={<Plus size={18} />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create class
            </Button>
            <Button
              variant="primary"
              icon={<Plus size={18} />}
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join class
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/class/${classItem.id}`)}
            >
              <div className={`h-24 ${classItem.color} relative`}>
                <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-gray-900">
                  {classItem.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">{classItem.teacher}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/class/${classItem.id}`);
                    }}
                  >
                    View class
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/class/${classItem.id}/settings`);
                    }}
                  >
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateClass}
      />
      <JoinClassModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinClass}
      />
    </div>
  );
};

export default Dashboard;
