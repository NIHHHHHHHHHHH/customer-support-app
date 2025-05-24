import { useState, useCallback } from 'react';
import { aiResponseGenerator } from '../services/aiService';

export const useAIService = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState('');

  const handleAIQuery = useCallback(async (query) => {
    if (!query?.trim()) return;
    
    setIsAiTyping(true);
    setAiResponse('');
    
    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      const response = aiResponseGenerator.generateResponse(query);
      setAiResponse(response);
      
      // Simulate notification sound
      console.log('🔔 AI response ready');
    } catch (error) {
      console.error('AI Service Error:', error);
      setAiResponse('Sorry, I encountered an error processing your request. Please try again.');
    } finally {
      setIsAiTyping(false);
    }
  }, []);

  const handleCopyResponse = useCallback(async () => {
    if (!aiResponse) return;
    
    try {
      await navigator.clipboard.writeText(aiResponse);
      console.log('✅ Response copied to clipboard');
    } catch (error) {
      console.error('Failed to copy response:', error);
    }
  }, [aiResponse]);

  return {
    aiResponse,
    isAiTyping,
    copilotQuery,
    setCopilotQuery,
    handleAIQuery,
    handleCopyResponse
  };
};