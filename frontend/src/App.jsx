import { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./components/layouts/AuthLayout";
import Signup from "./pages/Signup";
import ClassView from "./pages/Class";
import AssignmentView from "./pages/Assignment";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/class/:classId"
              element={
                <ProtectedRoute>
                  <ClassView />
                </ProtectedRoute>
              }
            />

            <Route
              path="/class/:classId/:tab"
              element={
                <ProtectedRoute>
                  <ClassView />
                </ProtectedRoute>
              }
            />

            <Route
              path="/class/:classId/assignment/:assignmentId"
              element={
                <ProtectedRoute>
                  <AssignmentView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
