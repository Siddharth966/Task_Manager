import React from 'react';
import StatusBadge from './StatusBadge';
import { Edit3, Trash2, Calendar, User } from 'lucide-react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      onDelete(task._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-white/20 p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <StatusBadge status={task.status} />
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onUpdate(task)}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
            title="Edit Task"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {task.description}
      </p>

      {/* Task Meta */}
      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-3">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>Created {formatDate(task.createdAt || new Date())}</span>
        </div>
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>Task</span>
        </div>
      </div>

      {/* Action Buttons - Mobile Version */}
      <div className="flex gap-2 mt-4 sm:hidden">
        <button
          onClick={() => onUpdate(task)}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200"
        >
          <Edit3 size={16} />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;