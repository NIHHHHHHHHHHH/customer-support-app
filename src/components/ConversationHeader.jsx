import React from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Phone, 
  Mail, 
  MoreHorizontal, 
  X 
} from 'lucide-react';

export const ConversationHeader = ({ 
  conversation, 
  onClose, 
  onCloseCopilot, 
  showQuickActions, 
  onToggleQuickActions 
}) => {
  return (
    <div className="flex items-center justify-between p-[14px] border-b border-gray-200 bg-white">

        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{conversation.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
            </div>
        </div>
      </div>
      
      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleQuickActions}
          className={`flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
            showQuickActions ? 'bg-gray-50' : ''
          }`}
          aria-label="Toggle quick actions"
        >
          <Zap className="w-4 h-4" />
          Quick Actions
        </button>
        
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Phone call"
        >
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Send email"
        >
          <Mail className="w-5 h-5 text-gray-600" />
        </button>
        
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          aria-label="Close AI Copilot"
        >
          <X className="w-4 h-4" />
          Close
        </button>
      </div>
    </div>
  );
};
