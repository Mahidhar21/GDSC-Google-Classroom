import React,{useState} from "react";
import ClassCard from "../components/Homepage/ClassCard";
import Navbar from "../components/Homepage/Navbar";
import Sidebar from "../components/Homepage/Sidebar";
import Todo from "../components/Extra/Todo";

function Homepage(){
  const classes = [
    { id: 1, title: "PH 107", section: "Section B", instructor: "Dr. Shailendra" },
    { id: 2, title: "MA 106", section: "Section B", instructor: "Dr. Tanveer" },
    { id: 3, title: "CS 108", section: "Section B", instructor: "Dr. Somnath" },
  ];

  const [showTodo, setShowTodo] = useState(true);

  return (
    <div className="min-h-screen ml-0 ">    
      <Navbar />
      <div className="flex flex-1 h-screen">
        <Sidebar setShowTodo={setShowTodo} />

        {showTodo ?
        ( <Todo />) : 
              (<div className="p-6 min-h-screen min-w-screen bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <ClassCard key={cls.id} {...cls} />
              ))}
            </div>
              )}
      </div>
    </div>
  );
};

export default Homepage;
