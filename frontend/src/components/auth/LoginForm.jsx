import React, { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // In a real app, you'd call an authentication API here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(email, password, remember);
    } catch (err) {
      setError(
        "Authentication failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">Sign in to your EduConnect account</p>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email address"
          type="email"
          id="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-5 w-5" />}
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-5 w-5" />}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="remember"
            label="Remember me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />

          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          >
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Sign in
        </Button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" fullWidth>
          <FcGoogle className="mr-2" />
          Google
        </Button>

        <Button variant="outline" fullWidth>
          <FaGithub className="mr-2" />
          Github
        </Button>
      </div>

      <p className="text-center text-gray-600 mt-8">
        Don't have an account?{" "}
        <a
          href="#"
          className="text-primary-600 hover:text-primary-500 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
