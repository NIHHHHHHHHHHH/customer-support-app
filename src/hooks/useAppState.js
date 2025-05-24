import { useState } from 'react';

export const useAppState = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [showAICopilot, setShowAICopilot] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRespond, setAutoRespond] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return {
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
  };
};