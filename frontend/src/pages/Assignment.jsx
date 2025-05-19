import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  Paperclip,
  MoreVertical,
  Send,
  Link as LinkIcon,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const AssignmentView = () => {
  const { assignmentId } = useParams();
  const [comment, setComment] = useState("");

  const mockAssignment = {
    id: assignmentId,
    title: "Chapter 5 Assignment",
    description:
      "Please complete exercises 5.1 through 5.4 from your textbook. Show all your work and explain your reasoning for each problem.",
    dueDate: "2024-03-07T23:59:59Z",
    points: 100,
    attachments: [{ name: "assignment_5.pdf", size: "2.4 MB" }],
    comments: [
      {
        id: 1,
        author: "John Doe",
        content: "Is it okay to submit the work in PDF format?",
        timestamp: "2024-02-28T14:30:00Z",
        replies: [
          {
            id: 2,
            author: "Dr. Smith",
            content: "Yes, PDF format is preferred.",
            timestamp: "2024-02-28T15:00:00Z",
          },
        ],
      },
    ],
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Handle comment submission
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Assignment Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <FileText size={24} className="text-gray-400" />
                  <h1 className="text-2xl font-bold text-gray-900">
                    {mockAssignment.title}
                  </h1>
                </div>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-600"
                  icon={<MoreVertical size={20} />}
                />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    Due Mar 7
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    11:59 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={16} />
                    {mockAssignment.points} points
                  </span>
                </div>

                <p className="text-gray-600">{mockAssignment.description}</p>

                {/* Attachments */}
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Attachments
                  </h3>
                  {mockAssignment.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Paperclip size={16} className="text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<LinkIcon size={16} />}
                      >
                        Open
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Class comments
              </h2>

              {/* Comment Input */}
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-medium">J</span>
                  </div>
                  <div className="flex-1">
                    <Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add class comment..."
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        icon={<Send size={16} />}
                        disabled={!comment.trim()}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {mockAssignment.comments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-medium">
                          {comment.author[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              {comment.author}
                            </p>
                            <p className="text-sm text-gray-500">Feb 28</p>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-600"
                            icon={<MoreVertical size={16} />}
                          />
                        </div>
                        <p className="mt-2 text-gray-600">{comment.content}</p>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies?.map((reply) => (
                      <div key={reply.id} className="flex gap-4 ml-14">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-600 font-medium text-sm">
                            {reply.author[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                {reply.author}
                              </p>
                              <p className="text-sm text-gray-500">Feb 28</p>
                            </div>
                            <Button
                              variant="ghost"
                              className="text-gray-400 hover:text-gray-600"
                              icon={<MoreVertical size={16} />}
                            />
                          </div>
                          <p className="mt-2 text-gray-600">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-medium text-gray-900 mb-4">Your work</h2>
              <Button variant="primary" fullWidth>
                + Add or create
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-medium text-gray-900 mb-4">
                Private comments
              </h2>
              <p className="text-sm text-gray-500">
                Only you and your teacher can see private comments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;
