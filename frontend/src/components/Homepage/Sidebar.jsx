
import React, {useState} from "react";
import { Home, ListCheck, School, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Todo from "../Extra/Todo";



function Sidebar(){

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/To-do"); 
  };

  const [showTodo, setShowTodo] = useState(false);

return(
<aside className="w-64 ml-0 bg-white shadow-md hidden md:block min-h-full sticky top-0">
  <div className="p-6">
    <ul className="space-y-6">
      <li className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600">
        <Home className="w-5 h-5 mr-2" /> Home
      </li>
      <li className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600">
        <School className="w-5 h-5 mr-2" /> Enrolled
      </li>
      <li className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600" h onClick={() => setShowTodo(!showTodo)}>
        <ListCheck className="w-5 h-5 mr-2" /> To-Do
      </li>
    </ul>
  </div>
</aside>
)
}


export default Sidebar;
