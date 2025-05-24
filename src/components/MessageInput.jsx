import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, ChevronDown, ChevronUp, Zap, Bookmark, Laugh, Bold, Italic, Code, Link, Hash } from 'lucide-react';

export const MessageInput = ({ onSendMessage, autoRespond, onAutoRespondToggle, insertedText, onInsertedTextUsed }) => {
  const [messageText, setMessageText] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [showRephrase, setShowRephrase] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [rephrasePosition, setRephrasePosition] = useState({ x: 0, y: 0 });
  const chatInputRef = useRef(null);
  const toolbarRef = useRef(null);
  const rephraseRef = useRef(null);

  // Handle inserted text from AI Copilot
  useEffect(() => {
    if (insertedText) {
      setMessageText(insertedText);
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus();
          chatInputRef.current.setSelectionRange(insertedText.length, insertedText.length);
        }
      }, 100);
      if (onInsertedTextUsed) {
        onInsertedTextUsed();
      }
    }
  }, [insertedText, onInsertedTextUsed]);

  const toolbarOptions = [
    { id: 'ai', label: 'AI', icon: 'AI', isAI: true },
    { id: 'bold', label: 'Bold', icon: Bold },
    { id: 'italic', label: 'Italic', icon: Italic },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'link', label: 'Link', icon: Link },
    { id: 'h1', label: 'H1', icon: 'H1' },
    { id: 'h2', label: 'H2', icon: 'H2' },
    { id: 'hash', label: 'Hash', icon: Hash }
  ];

  const rephraseOptions = [
    { id: 'rephrase', label: 'Rephrase' },
    { id: 'tone', label: 'My tone of voice' },
    { id: 'friendly', label: 'More friendly' },
    { id: 'formal', label: 'More formal' },
    { id: 'grammar', label: 'Fix grammar & spelling' },
    { id: 'translate', label: 'Translate...' }
  ];

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      setShowToolbar(false);
      setShowRephrase(false);
      setSelectedText('');
    }
  };

  const getCaretCoordinates = (element, position) => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const computed = getComputedStyle(element);
    
    div.style.cssText = computed.cssText;
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';
    div.style.width = element.offsetWidth + 'px';
    
    div.textContent = element.value.substring(0, position);
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);
    
    document.body.appendChild(div);
    const coordinates = {
      top: span.offsetTop,
      left: span.offsetLeft
    };
    document.body.removeChild(div);
    
    return coordinates;
  };

  const handleTextSelect = () => {
    if (!chatInputRef.current) return;
    
    const textarea = chatInputRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end).trim();
    
    if (selectedText && selectedText.length > 0) {
      setSelectedText(selectedText);
      setSelectionRange({ start, end });
      
      // Calculate toolbar position
      const textareaRect = textarea.getBoundingClientRect();
      const coordinates = getCaretCoordinates(textarea, start);
      
      setToolbarPosition({
        x: textareaRect.left + coordinates.left,
        y: textareaRect.top + coordinates.top - 50
      });
      
      setShowToolbar(true);
      setShowRephrase(false); // Hide rephrase if showing toolbar
    } else {
      setShowToolbar(false);
      setShowRephrase(false);
      setSelectedText('');
    }
  };

  const handleToolbarAction = (option) => {
    if (option.id === 'ai') {
      // Show rephrase popup when AI is clicked
      const toolbarRect = toolbarRef.current?.getBoundingClientRect();
      if (toolbarRect) {
        setRephrasePosition({
          x: toolbarRect.left,
          y: toolbarRect.bottom + 5
        });
      }
      setShowRephrase(true);
      return;
    }

    // Handle other formatting options
    if (!selectedText) return;

    let formattedText = selectedText;
    
    switch (option.id) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      default:
        break;
    }

    const newText = messageText.substring(0, selectionRange.start) + 
                   formattedText + 
                   messageText.substring(selectionRange.end);
    
    setMessageText(newText);
    setShowToolbar(false);
    setSelectedText('');
    
    // Focus back on textarea
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
        const newPosition = selectionRange.start + formattedText.length;
        chatInputRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 100);
  };

  const handleRephrase = (option) => {
    if (!selectedText) return;

    let rephrasedText = selectedText;
    
    switch (option.id) {
      case 'rephrase':
        rephrasedText = `[Rephrased] ${selectedText}`;
        break;
      case 'tone':
        rephrasedText = `[Tone adjusted] ${selectedText}`;
        break;
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

    const newText = messageText.substring(0, selectionRange.start) + 
                   rephrasedText + 
                   messageText.substring(selectionRange.end);
    
    setMessageText(newText);
    setShowToolbar(false);
    setShowRephrase(false);
    setSelectedText('');
    
    // Focus back on textarea
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
        const newPosition = selectionRange.start + rephrasedText.length;
        chatInputRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 100);
  };

  const rephraseToFriendly = (text) => {
    return text
      .replace(/cannot/g, "can't")
      .replace(/will not/g, "won't")
      .replace(/Please/g, "Please")
      .replace(/Thank you/g, "Thanks so much")
      + " 😊";
  };

  const rephraseToFormal = (text) => {
    return text
      .replace(/can't/g, "cannot")
      .replace(/won't/g, "will not")
      .replace(/Thanks/g, "Thank you")
      .replace(/Hi/g, "Dear customer,");
  };

  const fixGrammar = (text) => {
    return text
      .replace(/\bi\b/g, "I")
      .replace(/\bdont\b/g, "don't")
      .replace(/\bcant\b/g, "can't")
      .replace(/\bwont\b/g, "won't");
  };

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target) &&
          rephraseRef.current && !rephraseRef.current.contains(event.target) &&
          chatInputRef.current && !chatInputRef.current.contains(event.target)) {
        setShowToolbar(false);
        setShowRephrase(false);
        setSelectedText('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = (option) => {
    if (option.isAI) {
      return (
        <div className="w-6 h-6 bg-blue-500 text-white rounded text-xs font-bold flex items-center justify-center">
          AI
        </div>
      );
    }
    
    if (option.id === 'h1') {
      return <span className="text-sm font-bold">H1</span>;
    }
    
    if (option.id === 'h2') {
      return <span className="text-sm font-bold">H2</span>;
    }
    
    const IconComponent = option.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <>
      {/* Formatting Toolbar */}
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex items-center gap-1"
          style={{
            left: Math.min(toolbarPosition.x, window.innerWidth - 350),
            top: Math.max(toolbarPosition.y, 10)
          }}
        >
          {toolbarOptions.map((option, index) => (
            <React.Fragment key={option.id}>
              <button
                onClick={() => handleToolbarAction(option)}
                className={`p-2 rounded hover:bg-gray-100 transition-colors flex items-center justify-center ${
                  option.isAI ? 'bg-blue-50' : ''
                }`}
                title={option.label}
              >
                {renderIcon(option)}
              </button>
              {/* Add separator after AI button */}
              {index === 0 && (
                <div className="w-px h-6 bg-gray-300 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Rephrase Popup */}
      {showRephrase && (
        <div
          ref={rephraseRef}
          className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48"
          style={{
            left: Math.min(rephrasePosition.x, window.innerWidth - 200),
            top: rephrasePosition.y
          }}
        >
          {rephraseOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleRephrase(option)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mx-2 sm:mx-4 mb-2 sm:mb-4">
        {/* Row 1 - Chat Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2">
          <div className="flex items-center gap-2">
            <MessageSquareText className="w-4 h-4 text-black" />
            <span className="text-sm font-medium text-black">Chat</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-black" />
            ) : (
              <ChevronUp className="w-4 h-4 text-black" />
            )}
          </button>
        </div>

        {/* Row 2 - Input Area */}
        <div className="px-3 sm:px-4">
          <textarea
            ref={chatInputRef}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            onMouseUp={handleTextSelect}
            onKeyUp={handleTextSelect}
            placeholder="Use ⌘K for shortcuts"
            className="w-full text-sm text-gray-800 placeholder-gray-400 resize-none bg-transparent outline-none focus:outline-none"
            rows={isExpanded ? 12 : 4}
          />
        </div>

        {/* Row 3 - Icons and Send Button */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2">
          {/* Left side icons */}
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Zap className="w-4 h-4 text-black fill-black" />
            </button>
            
            <div className="w-px h-4 bg-black" />
            
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Bookmark className="w-4 h-4 text-black fill-black" />
            </button>
            
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Laugh className="w-4 h-4 text-white fill-black" />
            </button>
          </div>

          {/* Right side send button */}
          <div className="flex items-center">
            <button
              onClick={handleSend}
              disabled={!messageText.trim()}
              className="flex items-center px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium gap-2"
            >
              <span>Send</span>
              <div className="w-px h-4 bg-white opacity-50" />
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


