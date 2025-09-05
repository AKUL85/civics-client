import React, { createContext, useContext, useState } from 'react';

const AIAssistantContext = createContext();

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

export const AIAssistantProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('bn');
  const [voiceMode, setVoiceMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const value = {
    messages,
    isTyping,
    language,
    voiceMode,
    loading,
    addMessage,
    setIsTyping,
    setLanguage,
    setVoiceMode,
    setLoading,
    clearMessages,
  };

  return (
    <AIAssistantContext.Provider value={value}>
      {children}
    </AIAssistantContext.Provider>
  );
};