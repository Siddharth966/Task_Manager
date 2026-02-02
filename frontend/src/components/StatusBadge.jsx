import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      text: 'text-white',
      emoji: '🟡',
      label: 'Pending'
    },
    'in-progress': {
      bg: 'bg-gradient-to-r from-blue-400 to-blue-600',
      text: 'text-white',
      emoji: '🔵',
      label: 'In Progress'
    },
    completed: {
      bg: 'bg-gradient-to-r from-green-400 to-green-600',
      text: 'text-white',
      emoji: '🟢',
      label: 'Completed'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1`}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;