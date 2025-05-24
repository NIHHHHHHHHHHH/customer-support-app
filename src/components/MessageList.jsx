import React from 'react';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';

export const MessageList = ({ messages, isTyping, messagesEndRef }) => (
  <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white">
    {messages.map((message) => (
      <MessageItem key={message.id} message={message} />
    ))}
    {isTyping && <TypingIndicator />}
    <div ref={messagesEndRef} />
  </div>
);