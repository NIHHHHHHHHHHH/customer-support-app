import React from 'react';
import { Clock, Check, Eye } from 'lucide-react';

export const MessageItem = ({ message }) => (
  <div className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
      message.sender === 'agent' 
        ? 'bg-[#d4dbf5] text-black' 
        : 'bg-gray-50 text-gray-800 shadow-sm border border-gray-200'
    }`}>
      <p className="text-sm">{message.message}</p>
      <div className={`flex items-center justify-between mt-2 text-xs ${
        message.sender === 'agent' ? 'text-black' : 'text-gray-500'
      }`}>
        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        {message.sender === 'agent' && (
          <div className="flex items-center gap-1 text-black">
            {message.status === 'sending' && <Clock className="w-3 h-3" />}
            {message.status === 'delivered' && <Check className="w-3 h-3" />}
            {message.status === 'seen' && <Eye className="w-3 h-3" />}
          </div>
        )}
      </div>
    </div>
  </div>
);