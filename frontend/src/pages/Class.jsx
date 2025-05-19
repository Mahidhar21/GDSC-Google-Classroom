import { useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  Layout,
  MoreVertical,
  Settings,
  FileText,
  Calendar,
  Clock,
  Paperclip,
} from "lucide-react";
import Button from "../components/ui/Button";

const ClassView = () => {
  const { classId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const tabs = [
    { id: "stream", label: "Stream", icon: Layout },
    { id: "classwork", label: "Classwork", icon: BookOpen },
    { id: "people", label: "People", icon: Users },
  ];

  const currentTab = location.pathname.split("/").pop() || "stream";

  const mockClass = {
    id: classId,
    name: "Advanced Mathematics",
    section: "Section A",
    subject: "Mathematics",
    room: "Room 101",
    teacher: "Dr. Smith",
    meetLink: "https://meet.google.com/abc-defg-hij",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Class Header */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{mockClass.name}</h1>
                <p className="mt-1 text-primary-100">{mockClass.section}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-transparent"
                >
                  Customize
                </Button>
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    icon={<MoreVertical size={20} />}
                    onClick={() => setShowMenu(!showMenu)}
                  />
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                        <Settings size={16} />
                        Class settings
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 mt-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    to={`/class/${classId}/${tab.id}`}
                    className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                      currentTab === tab.id
                        ? "border-white text-white"
                        : "border-transparent text-primary-100 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === "stream" && <StreamTab classDetails={mockClass} />}
        {currentTab === "classwork" && <ClassworkTab />}
        {currentTab === "people" && <PeopleTab />}
      </div>
    </div>
  );
};

const StreamTab = ({ classDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Announcement Input */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium">T</span>
            </div>
            <button className="flex-1 text-left px-4 py-3 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50">
              Announce something to your class
            </button>
          </div>
        </div>

        {/* Stream Items */}
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">T</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">Dr. Smith</h3>
                      <p className="text-sm text-gray-500">
                        Posted a new assignment • Feb 28
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gray-400 hover:text-gray-600"
                      icon={<MoreVertical size={20} />}
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900">
                      Chapter 5 Assignment
                    </h4>
                    <p className="mt-2 text-gray-600">
                      Please complete exercises 5.1 through 5.4 from your
                      textbook.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Due Mar 7
                    </span>
                    <span className="flex items-center gap-1">
                      <Paperclip size={16} />1 attachment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-medium text-gray-900 mb-4">Upcoming</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Chapter 5 Assignment
                </p>
                <p className="text-sm text-gray-500">Due Mar 7</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-4 text-primary-600">
            View all
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-medium text-gray-900 mb-4">Class code</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <span className="text-2xl font-mono font-medium text-gray-900">
              ABC123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClassworkTab = () => {
  const topics = ["Chapter 1", "Chapter 2", "Chapter 3"];

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Classwork</h2>
        <Button variant="primary" icon={<FileText size={18} />}>
          Create
        </Button>
      </div>

      <div className="space-y-8">
        {topics.map((topic) => (
          <div key={topic}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">{topic}</h3>
            <div className="space-y-4">
              {[1, 2].map((assignment) => (
                <div
                  key={assignment}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <FileText size={24} className="text-gray-400" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Assignment {assignment}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Posted Feb {20 + assignment}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-gray-400 hover:text-gray-600"
                          icon={<MoreVertical size={20} />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PeopleTab = () => {
  const teachers = [{ name: "Dr. Smith", email: "smith@example.com" }];

  const students = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Mike Johnson", email: "mike@example.com" },
  ];

  return (
    <div className="max-w-4xl">
      {/* Teachers Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Teachers</h2>
        <div className="bg-white rounded-lg shadow-sm">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {teacher.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Students</h2>
          <Button variant="primary" icon={<Users size={18} />}>
            Invite Students
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          {students.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {student.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-gray-600"
                icon={<MoreVertical size={20} />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassView;
