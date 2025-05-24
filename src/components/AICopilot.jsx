import React, { useState, useEffect } from 'react';
import { Bot, User, X, Plus } from 'lucide-react';
import { AIResponse } from './AIResponse';
import { KnowledgeSources } from './KnowledgeSources';
import { AIInput } from './AIInput';
import { mockSuggestions } from '../data/mockData';
import { Details } from './Details';

export const AICopilot = ({
  conversation,
  onClose,
  aiResponse,
  isAiTyping,
  copilotQuery,
  onQueryChange,
  onSubmitQuery,
  onCopyResponse,
  onAddToComposer
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showCopilotPopup, setShowCopilotPopup] = useState(false);
  const [copilotQuery2, setCopilotQuery2] = useState('');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [activeTab, setActiveTab] = useState('copilot');

  const suggestedQuestions = [
    "How do I get a refund?",
    "What's your return policy?",
    "How long does shipping take?",
    "What if the order was over 60 days ago?"
  ];

  // Reset state when conversation changes
  useEffect(() => {
    setHasUserInteracted(false);
    setShowSuggestions(true);
    // Clear any existing query and response when switching conversations
    onQueryChange('');
  }, [conversation?.id, onQueryChange]);

  // Auto-show copilot popup for customer messages about refunds
  useEffect(() => {
    if (conversation?.lastMessage?.includes("over 60 days ago")) {
      setShowCopilotPopup(true);
      setCopilotQuery2("I placed the order over 60 days ago 😭. Could you make an exception, please?");
    }
  }, [conversation]);

  const handleSuggestionClick = (suggestion) => {
    setHasUserInteracted(true);
    onQueryChange(suggestion);
    onSubmitQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleManualSubmit = (query) => {
    setHasUserInteracted(true);
    onSubmitQuery(query);
    setShowSuggestions(false);
  };

  const handleAddToComposer = (responseText) => {
    // Call the parent function to insert text into MessageInput
    if (onAddToComposer) {
      onAddToComposer(responseText);
    }
    console.log('Adding AI response to message composer');
  };

  const handleCopilotPopupSubmit = () => {
    setHasUserInteracted(true);
    onQueryChange(copilotQuery2);
    onSubmitQuery(copilotQuery2);
    setShowCopilotPopup(false);
  };

  return (
    <>
      {/* Main container for the AICopilot component */}
      {/* On small screens, it takes full width. On larger screens, it has a max-width. */}
      {/* Added `min-w-0` to prevent overflow issues on very narrow screens. */}
      <div className="w-full sm:max-w-lg bg-white border-l border-gray-200 flex flex-col min-w-0">
        {/* Header */}
        {/* Adjusted padding for smaller screens to be less cramped */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          {/* Flex items wrap on smaller screens if needed */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-10">
            <button
              onClick={() => setActiveTab('copilot')}
              className={`flex items-center gap-2 font-medium text-base sm:text-lg pb-1 ${
                activeTab === 'copilot'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              AI Copilot
            </button>

            <button
              onClick={() => setActiveTab('details')}
              className={`font-medium text-base sm:text-lg pb-1 ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Details
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close AI Copilot"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {/* Added `flex-1` and `overflow-y-auto` to ensure content scrolls if it exceeds height */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {activeTab === 'details' ? (
            // Details Tab Content
            <Details />
          ) : (
            // Copilot Tab Content
            <div className="flex-1 bg-gradient-to-b from-white to-pink-100 flex flex-col">
              {!hasUserInteracted ? (
                // Welcome Screen with Suggestions
                <>
                  <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-3 sm:mb-4">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Hi, I'm Fin AI Copilot</h3>
                    <p className="text-sm text-gray-600 mb-8 sm:mb-12">Ask me anything about this conversation.</p>
                  </div>
                  
                  {/* Single Suggested Question above input */}
                  {/* Adjusted padding and font size for smaller screens */}
                  <div className="px-3 pb-2 sm:px-4 sm:pb-2">
                    <div
                      onClick={() => handleSuggestionClick(suggestedQuestions[0])}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <span className="text-gray-600 text-xs sm:text-sm font-medium">Suggested</span>
                      <span className="text-base sm:text-lg">🌟</span>
                      <span className="text-gray-800 text-xs sm:text-sm flex-1 text-left">{suggestedQuestions[0]}</span>
                    </div>
                  </div>
                </>
              ) : (
                // Conversation View
                <div className="p-3 sm:p-4">
                  <div className="space-y-4 sm:space-y-6">
                    {/* User Query */}
                    {copilotQuery && (
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">You</p>
                          <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                            <p className="text-xs sm:text-sm text-gray-700">{copilotQuery}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Response */}
                    {(aiResponse || isAiTyping) && (
                      <AIResponse
                        isTyping={isAiTyping}
                        response={aiResponse}
                        onCopy={onCopyResponse}
                        onAddToComposer={handleAddToComposer}
                      />
                    )}
                  </div>

                  {/* Knowledge Sources */}
                  {aiResponse && !isAiTyping && <KnowledgeSources />}

                  {/* Suggested Questions after response - Updated styling */}
                  {aiResponse && !isAiTyping && (
                    <div className="mt-4 sm:mt-6">
                      <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                          <span className="text-xxs sm:text-xs">💡</span>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">Suggested questions</span>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        {suggestedQuestions.map((question, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(question)}
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <span className="text-gray-600 text-xs sm:text-sm font-medium">Suggested</span>
                            <span className="text-base sm:text-lg">🌟</span>
                            <span className="text-gray-800 text-xs sm:text-sm flex-1 text-left">{question}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area - Only show for Copilot tab */}
        {activeTab === 'copilot' && (
          <AIInput
            query={copilotQuery}
            onQueryChange={onQueryChange}
            onSubmit={handleManualSubmit}
            isTyping={isAiTyping}
            showSuggestions={showSuggestions && !hasUserInteracted}
            suggestions={mockSuggestions}
            onSuggestionClick={handleSuggestionClick}
            onHideSuggestions={() => setShowSuggestions(false)}
          />
        )}
      </div>

      {/* Ask Fin Copilot Popup */}
      {showCopilotPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> {/* Added p-4 for padding on small screens */}
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-20"
            onClick={() => setShowCopilotPopup(false)}
          />
          
          {/* Popup */}
          {/* Reduced max-w and adjusted padding for smaller screens */}
          <div className="relative bg-white rounded-xl shadow-2xl p-3 max-w-sm w-full border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Ask Fin Copilot</h3>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="bg-gray-50 rounded-lg p-2 mb-2">
                <p className="text-sm text-gray-700">{copilotQuery2}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📎</span>
                <span>1min</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowCopilotPopup(false)}
                className="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCopilotPopupSubmit}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Ask Copilot
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


