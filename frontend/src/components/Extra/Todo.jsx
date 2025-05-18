import React, { useState } from "react";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className=" bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <div className ="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <button
                onClick={() => setShowTodo(!showTodo)}
                className="text-red-500 font-bold hover:text-red-700 mr-0"
              >
                ✕
              </button>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 border rounded-xl px-3 py-2"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between border p-3 rounded-xl bg-gray-50"
            >
              <span
                onClick={() => toggleTask(index)}
                className={`flex-1 cursor-pointer ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
