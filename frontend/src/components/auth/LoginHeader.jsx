import React from 'react';
import { BookOpen } from 'lucide-react';

const LoginHeader = () => {
  return (
    <div className="flex items-center space-x-2 mb-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
        <BookOpen className="h-6 w-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">EduConnect</h2>
        <p className="text-sm text-gray-600">Modern Learning Platform</p>
      </div>
    </div>
  );
};

export default LoginHeader;