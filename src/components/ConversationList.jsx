import React from 'react';
import { 
  Search, 
  AlertCircle, 
  Settings, 
  Clock, 
  ChevronDown, 
  Star, 
  Volume2, 
  VolumeX, 
  Archive 
} from 'lucide-react';
import { ConversationItem } from './ConversationItem';

export const ConversationList = ({
  conversations,
  activeConversation,
  onConversationSelect,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  soundEnabled,
  onSoundToggle,
  showNotifications,
  onNotificationsToggle
}) => {
  const filterOptions = [
    { value: 'all', label: `All (${conversations.length})` },
    { value: 'waiting', label: 'Waiting' },
    { value: 'open', label: 'Open' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-[17px] border-b border-gray-200 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Your Inbox</h2>
        </div>
      </div>
      
      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
         {/* Filters */}
         <div className="flex items-center gap-12 mb-2 mt-4">
          <select 
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="text-base font-semi-bold px-2 py-"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="text-base font-semi-bold text-black flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Waiting Longest
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No conversations found</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation?.id === conversation.id}
              onClick={() => onConversationSelect(conversation)}
            />
          ))
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{conversations.length} total conversations</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={onSoundToggle}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label={`Turn sound ${soundEnabled ? 'off' : 'on'}`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button 
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Archive"
            >
              <Archive className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};






