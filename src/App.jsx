import React, { useState, useEffect } from 'react';
import { ConversationList } from './components/ConversationList';
import { ConversationView } from './components/ConversationView';
import { AICopilot } from './components/AICopilot';
import { WelcomeScreen } from './components/WelcomeScreen';
import { NotificationPanel } from './components/NotificationPanel';
import { useAppState } from './hooks/useAppState';
import { useAIService } from './hooks/useAIService';
import { mockConversations } from './data/mockData';

const CustomerSupportApp = () => {
  const {
    activeConversation,
    setActiveConversation,
    showAICopilot,
    setShowAICopilot,
    showNotifications,
    setShowNotifications,
    soundEnabled,
    setSoundEnabled,
    autoRespond,
    setAutoRespond,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter
  } = useAppState();

  const {
    aiResponse,
    isAiTyping,
    copilotQuery,
    setCopilotQuery,
    handleAIQuery,
    handleCopyResponse
  } = useAIService();

  const [conversations] = useState(mockConversations);

  // NEW STATE: State to hold the text that needs to be inserted into the MessageInput
  const [textToInsertInComposer, setTextToInsertInComposer] = useState('');

  // NEW FUNCTION: This function will be passed to AICopilot.
  // When AICopilot's "Add to Composer" button is clicked, it will call this function
  // with the AI-generated response text.
  const handleAddToComposerFromAI = (text) => {
    setTextToInsertInComposer(text);
    // Optionally, you might want to automatically close the AI Copilot when text is added.
    // setShowAICopilot(false);
  };

  // NEW FUNCTION: This function will be passed to ConversationView (and then MessageInput).
  // MessageInput will call this function once it has used the inserted text,
  // allowing us to clear the state and prevent re-insertion on subsequent renders.
  const handleInsertedTextUsed = () => {
    setTextToInsertInComposer('');
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    setShowAICopilot(true);
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || conv.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <ConversationList
        conversations={filteredConversations}
        activeConversation={activeConversation}
        onConversationSelect={handleConversationSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        soundEnabled={soundEnabled}
        onSoundToggle={setSoundEnabled}
        showNotifications={showNotifications}
        onNotificationsToggle={setShowNotifications}
      />

      {activeConversation ? (
        <ConversationView
          conversation={activeConversation}
          onClose={() => setActiveConversation(null)}
          onCloseCopilot={() => setShowAICopilot(false)}
          autoRespond={autoRespond}
          onAutoRespondToggle={setAutoRespond}
          // Pass the new state and its clear function down to ConversationView
          insertedText={textToInsertInComposer}
          onInsertedTextUsed={handleInsertedTextUsed}
        />
      ) : (
        <WelcomeScreen />
      )}

      {showAICopilot && activeConversation && (
        <AICopilot
          conversation={activeConversation}
          onClose={() => setShowAICopilot(false)}
          aiResponse={aiResponse}
          isAiTyping={isAiTyping}
          copilotQuery={copilotQuery}
          onQueryChange={setCopilotQuery}
          onSubmitQuery={handleAIQuery}
          onCopyResponse={handleCopyResponse}
          // Pass the handler for adding text to the composer to AICopilot
          onAddToComposer={handleAddToComposerFromAI}
        />
      )}

      {showNotifications && (
        <NotificationPanel
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default CustomerSupportApp;


