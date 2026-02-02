import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { PlusCircle, Edit3 } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [editTask, setEditTask] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axiosInstance.get('/tasks');
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }
    await axiosInstance.post('/tasks', { title, description, status });
    fetchTasks();
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  const handleUpdateSubmit = async () => {
    try {
      await axiosInstance.put(`/tasks/${editTask._id}`, editTask);
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      alert("Update failed");
    }
  };

  const deleteTask = async (id) => {
    await axiosInstance.delete(`/tasks/${id}`);
    fetchTasks();
  };

  if (!user)
    return <div className="text-center mt-20 text-xl font-semibold">Please login</div>;

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex  justify-center px-2 py-2">
    <div className="container mx-auto p-6 max-w-7xl">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Task Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Manage your tasks efficiently and stay organized</p>
      </div>

      {/* Task Form */}
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 mb-10 hover:shadow-3xl transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <PlusCircle className="text-blue-600" size={24} />
          Create New Task
        </h2>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              placeholder="Enter short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            >
              <option value="pending">🟡 Pending</option>
              <option value="in-progress">🔵 In Progress</option>
              <option value="completed">🟢 Completed</option>
            </select>
          </div>

          <button
            onClick={createTask}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={() => setEditTask(task)}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks yet!</h3>
            <p className="text-gray-600">Create your first task above to get started on your productivity journey.</p>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/50">

            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Edit3 className="text-blue-600" size={24} />
              Update Task
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="pending">🟡 Pending</option>
                  <option value="in-progress">🔵 In Progress</option>
                  <option value="completed">🟢 Completed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setEditTask(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-2xl font-semibold transition-all duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Update Task
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
