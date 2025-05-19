import { Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-primary-600 text-white p-8 flex-col justify-between animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <BookOpen size={32} />
            <h1 className="text-2xl font-bold">EduClass</h1>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">Transform your classroom experience</h2>
            <p className="text-primary-100 text-lg mb-6">
              Simplify teaching and learning with our interactive platform designed for educators and students.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-2">10k+</span>
                <span className="text-primary-200">Active Schools</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-2">500k+</span>
                <span className="text-primary-200">Students</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-2">50k+</span>
                <span className="text-primary-200">Teachers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-2">99%</span>
                <span className="text-primary-200">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-primary-200 text-sm">© 2025 EduClass. All rights reserved.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-10 animate-slide-up">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center gap-2 mb-8 justify-center">
            <BookOpen size={32} className="text-primary-600" />
            <h1 className="text-2xl font-bold text-primary-600">EduClass</h1>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;