import React, { createContext, useContext, useState } from 'react';

const GuidesContext = createContext();

export const useGuides = () => {
  const context = useContext(GuidesContext);
  if (!context) {
    throw new Error('useGuides must be used within a GuidesProvider');
  }
  return context;
};

export const GuidesProvider = ({ children }) => {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    guides,
    selectedGuide,
    categories,
    searchResults,
    loading,
    error,
    setGuides,
    setSelectedGuide,
    setCategories,
    setSearchResults,
    setLoading,
    setError,
  };

  return (
    <GuidesContext.Provider value={value}>
      {children}
    </GuidesContext.Provider>
  );
};