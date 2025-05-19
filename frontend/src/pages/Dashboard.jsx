import { useAuth } from "../components/contexts/AuthContext";
import { LogOut } from "lucide-react";
import Button from "../components/ui/Button";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-primary-600">EduClass</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">
                {user?.name}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={logout}
                icon={<LogOut size={16} />}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to your Dashboard
          </h2>
          <p className="text-gray-600">
            You have successfully signed in to the Google Classroom clone. This
            is a placeholder dashboard that will be expanded in future updates.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
