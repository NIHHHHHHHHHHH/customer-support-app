import React, { useState, useRef, useEffect } from 'react';
import { ConversationHeader } from './ConversationHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { QuickActionsPanel } from './QuickActionsPanel';
import { useChatMessages } from '../hooks/useChatMessages';

export const ConversationView = ({ 
  conversation, 
  onClose, 
  onCloseCopilot, 
  autoRespond, 
  onAutoRespondToggle,
  insertedText,
  onInsertedTextUsed
}) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { messages, sendMessage, isTyping } = useChatMessages(conversation, autoRespond);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ConversationHeader 
        conversation={conversation}
        onClose={onClose}
        onCloseCopilot={onCloseCopilot}
        showQuickActions={showQuickActions}
        onToggleQuickActions={() => setShowQuickActions(!showQuickActions)}
      />

      {showQuickActions && <QuickActionsPanel />}


      <MessageList 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <MessageInput 
        onSendMessage={sendMessage}
        autoRespond={autoRespond}
        onAutoRespondToggle={onAutoRespondToggle}
        insertedText={insertedText}
        onInsertedTextUsed={onInsertedTextUsed}
      />
    </div>
  );
};


