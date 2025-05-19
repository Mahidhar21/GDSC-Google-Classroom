import { useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { User, Mail, Bell, Shield, Key } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 md:col-span-3">
              {activeTab === "profile" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Profile Information
                    </h2>
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        icon={<User size={18} />}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        icon={<Mail size={18} />}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium text-gray-900">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive email updates about your classes
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="email-notifications"
                        />
                        <label
                          htmlFor="email-notifications"
                          className="block bg-gray-200 w-12 h-6 rounded-full cursor-pointer transition-colors hover:bg-gray-300"
                        >
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium text-gray-900">
                          Assignment Reminders
                        </p>
                        <p className="text-sm text-gray-500">
                          Get notified about upcoming assignments
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="assignment-reminders"
                        />
                        <label
                          htmlFor="assignment-reminders"
                          className="block bg-gray-200 w-12 h-6 rounded-full cursor-pointer transition-colors hover:bg-gray-300"
                        >
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Change Password
                    </h2>
                    <div className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentPassword: e.target.value,
                          })
                        }
                        icon={<Key size={18} />}
                      />
                      <Input
                        label="New Password"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                        icon={<Key size={18} />}
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        icon={<Key size={18} />}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Update Password
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
