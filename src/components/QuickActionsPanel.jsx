import React, { useState } from 'react';
import { RotateCcw, FileText, AlertCircle, Phone, ChevronDown } from 'lucide-react';

const quickActions = [
  { id: 1, label: 'Apply Refund', icon: RotateCcw, color: 'bg-green-500' },
  { id: 2, label: 'Request Info', icon: FileText, color: 'bg-blue-500' },
  { id: 3, label: 'Escalate', icon: AlertCircle, color: 'bg-red-500' },
  { id: 4, label: 'Schedule Call', icon: Phone, color: 'bg-purple-500' }
];

export const QuickActionsPanel = ({ onActionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
    
    // For demo purposes, show different behaviors
    switch (action.id) {
      case 1: // Apply Refund
        console.log('Applying refund...');
        break;
      case 2: // Request Info
        console.log('Requesting additional information...');
        break;
      case 3: // Escalate
        console.log('Escalating to manager...');
        break;
      case 4: // Schedule Call
        console.log('Opening calendar for call scheduling...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
        >
          <span>{isExpanded ? 'Less' : 'More'}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className={`grid gap-3 transition-all duration-200 ${
        isExpanded ? 'grid-cols-2' : 'grid-cols-4'
      }`}>
        {quickActions.slice(0, isExpanded ? 4 : 4).map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`flex items-center justify-center gap-2 px-3 py-2 ${action.color} text-white rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium ${
                isExpanded ? 'flex-col h-16' : 'h-10'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className={isExpanded ? 'text-xs' : 'hidden sm:inline'}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Status indicator */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Actions ready</span>
        </div>
        <span>Click to execute</span>
      </div>
    </div>
  );
};


