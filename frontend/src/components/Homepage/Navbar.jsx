import React from "react";
import { BookOpen, Settings } from 'lucide-react';

function Navbar() {
    return (
      <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center w-screen">
       <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600">
                <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">EduConnect</h2>
        </div>

      
        
        <div className="space-x-4 flex ">
          <button className="text-gray-600 hover:text-gray-800">+ Join</button>
          <button className="text-gray-600 hover:text-gray-800">+ Create</button>
          <Settings />
        </div>
      </nav>
    );
}

export default Navbar;