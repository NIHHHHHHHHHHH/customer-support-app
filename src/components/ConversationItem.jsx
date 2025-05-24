import React from 'react';

export const ConversationItem = ({ conversation, isActive, onClick }) => {
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
         
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
         
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
         
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };
   
  return (
    <div
      className="p-2 border-b border-gray-100 cursor-pointer transition-colors"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={`flex items-start gap-3 rounded-xl p-3 ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}>
        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-medium">
          {conversation.avatar}
        </div>
                 
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {conversation.name}
            </h3>
            <span className="text-xs text-gray-500">
              {formatTime(conversation.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-1 mb-2">
            {conversation.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

