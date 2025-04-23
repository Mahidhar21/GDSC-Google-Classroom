import React from "react";

function ClassCard({ title, section, instructor }) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition max-h-56 max-w-96 ">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{section}</p>
        <p className="text-gray-500 mt-2">Instructor: {instructor}</p>
      </div>
    );
}
  
  
export default ClassCard;