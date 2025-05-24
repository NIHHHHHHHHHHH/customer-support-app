import React, { useState, useEffect } from 'react';
import { Bot, Copy, Plus, Check, ChevronDown } from 'lucide-react';

export const AIResponse = ({ isTyping, response, onCopy, onAddToComposer }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  useEffect(() => {
    if (isTyping) {
      setDisplayedText('');
      setIsComplete(false);
      setShowAddButton(false);
      return;
    }

    if (response && !isComplete) {
      // Simulate typing effect
      let index = 0;
      const typingSpeed = 20; // milliseconds per character

      const typeText = () => {
        if (index < response.length) {
          setDisplayedText(response.slice(0, index + 1));
          index++;
          setTimeout(typeText, typingSpeed);
        } else {
          setIsComplete(true);
          // Show "Add to composer" button after typing is complete
          setTimeout(() => {
            setShowAddButton(true);
          }, 500);
        }
      };

      typeText();
    }
  }, [response, isTyping, isComplete]);

  const handleCopy = async () => {
    if (onCopy) {
      await onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToComposer = () => {
    if (onAddToComposer && response) {
      onAddToComposer(response);
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 mb-1">Fin</p>
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-lg p-4 border border-purple-100">
          {isTyping ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600">Fin is typing...</span>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {displayedText}
                {!isComplete && (
                  <span className="inline-block w-2 h-5 bg-purple-400 ml-1 animate-pulse"></span>
                )}
              </div>
              
              {/* Add to Composer Button - matches Image 2 styling exactly */}
              {showAddButton && (
                <div className="mt-4 pt-3 border-t border-purple-200">
                  <button
                    onClick={handleAddToComposer}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Add to composer
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Action buttons */}
        {isComplete && !isTyping && (
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



