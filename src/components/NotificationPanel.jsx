import React from 'react';
import { X, AlertCircle, Bot, Users } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

export const NotificationPanel = ({ onClose }) => {
  const getIcon = (iconName) => {
    const icons = {
      AlertCircle,
      Bot,
      Users
    };
    return icons[iconName] || AlertCircle;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-50 text-red-600',
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {mockNotifications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No new notifications</p>
          </div>
        ) : (
          mockNotifications.map((notification) => {
            const IconComponent = getIcon(notification.icon);
            const colorClasses = getColorClasses(notification.color);
            
            return (
              <div 
                key={notification.id} 
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${colorClasses}`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs opacity-80">{notification.message}</p>
                    </div>
                    <span className="text-xs opacity-60 flex-shrink-0 ml-2">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {mockNotifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 transition-colors">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};