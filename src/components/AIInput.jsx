import React, { useState, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';

export const AIInput = ({
  query,
  onQueryChange,
  onSubmit,
  isTyping,
  showSuggestions,
  suggestions,
  onSuggestionClick,
  onHideSuggestions
}) => {
  const [showRephraseMenu, setShowRephraseMenu] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const inputRef = useRef(null);

  const rephraseOptions = [
    { id: 'friendly', label: 'More friendly', icon: '😊' },
    { id: 'formal', label: 'More formal', icon: '👔' },
    { id: 'grammar', label: 'Fix grammar & spelling', icon: '✏️' },
    { id: 'translate', label: 'Translate...', icon: '🌐' }
  ];

  const handleSubmit = () => {
    if (query.trim() && !isTyping) {
      onSubmit(query);
      setShowRephraseMenu(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText && inputRef.current?.contains(selection.anchorNode)) {
      setSelectedText(selectedText);
      setShowRephraseMenu(true);
    } else {
      setShowRephraseMenu(false);
      setSelectedText('');
    }
  };

  const handleRephrase = (option) => {
    if (!selectedText) return;

    let rephrasedText = selectedText;
    
    switch (option.id) {
      case 'friendly':
        rephrasedText = rephraseToFriendly(selectedText);
        break;
      case 'formal':
        rephrasedText = rephraseToFormal(selectedText);
        break;
      case 'grammar':
        rephrasedText = fixGrammar(selectedText);
        break;
      case 'translate':
        rephrasedText = `[Translated] ${selectedText}`;
        break;
      default:
        break;
    }

    const newText = query.replace(selectedText, rephrasedText);
    onQueryChange(newText);
    setShowRephraseMenu(false);
    setSelectedText('');
  };

  const rephraseToFriendly = (text) => {
    return text
      .replace(/cannot/, "can't")
      .replace(/will not/, "won't")
      .replace(/Please/, "Please")
      .replace(/Thank you/, "Thanks so much")
      + " 😊";
  };

  const rephraseToFormal = (text) => {
    return text
      .replace(/can't/, "cannot")
      .replace(/won't/, "will not")
      .replace(/Thanks/, "Thank you")
      .replace(/Hi/, "Dear customer,");
  };

  const fixGrammar = (text) => {
    return text
      .replace(/\bi\b/g, "I")
      .replace(/\bdont\b/g, "don't")
      .replace(/\bcant\b/g, "can't")
      .replace(/\bwont\b/g, "won't");
  };

  return (
    <div className="border-t border-gray-200 p-2 sm:p-4 bg-pink-100">
      {/* Rephrase Menu */}
      {showRephraseMenu && selectedText && (
        <div className="mb-2 sm:mb-3 bg-white border border-gray-200 rounded-lg shadow-lg p-1.5 sm:p-2 relative z-10 mx-1 sm:mx-0">
          <div className="text-xs text-gray-600 mb-1.5 sm:mb-2 px-1.5 sm:px-2 font-medium">Rephrase</div>
          <div className="space-y-0.5 sm:space-y-1">
            {rephraseOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleRephrase(option)}
                className="w-full text-left px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm hover:bg-gray-50 rounded flex items-center gap-1.5 sm:gap-2 transition-colors min-h-[32px] sm:min-h-auto"
              >
                <span className="text-sm sm:text-base flex-shrink-0">{option.icon}</span>
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="relative px-1 sm:px-0">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onMouseUp={handleTextSelect}
            onKeyUp={handleTextSelect}
            placeholder="Ask AI anything about this conversation..."
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white placeholder:text-xs sm:placeholder:text-sm"
            disabled={isTyping}
          />
          <button 
            onClick={handleSubmit}
            disabled={!query.trim() || isTyping}
            className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

// Demo wrapper to show the component in action
export default function ResponsiveAIInputDemo() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (queryText) => {
    console.log('Submitted:', queryText);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setQuery('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Responsive AI Input Component</h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6">
              <p className="text-gray-600 mb-4">Try selecting text in the input field below to see the rephrase menu. The component is fully responsive and works on screens as small as 300px wide.</p>
              <p className="text-sm text-gray-500">Resize your browser window to test responsiveness.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sticky bottom-0">
        <AIInput
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSubmit}
          isTyping={isTyping}
          showSuggestions={false}
          suggestions={[]}
          onSuggestionClick={() => {}}
          onHideSuggestions={() => {}}
        />
      </div>
    </div>
  );
}



