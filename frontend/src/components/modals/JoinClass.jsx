import { useState } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const JoinClassModal = ({ isOpen, onClose, onSubmit }) => {
  const [classCode, setClassCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Join Class</h2>
        <p className="text-gray-600 text-sm mb-6">
          Ask your teacher for the class code, then enter it here.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Class code"
              placeholder="Enter class code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Join
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinClassModal;
