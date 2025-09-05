import React, { createContext, useContext, useState } from 'react';

const LawyersContext = createContext();

export const useLawyers = () => {
  const context = useContext(LawyersContext);
  if (!context) {
    throw new Error('useLawyers must be used within a LawyersProvider');
  }
  return context;
};

export const LawyersProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    priceRange: '',
    language: '',
    rating: 0,
  });

  const updateLawyers = (lawyersData) => {
    setLawyers(lawyersData);
    setFilteredLawyers(lawyersData);
  };

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Apply filters
    let filtered = lawyers;
    if (updatedFilters.specialization) {
      filtered = filtered.filter(lawyer => lawyer.specialization === updatedFilters.specialization);
    }
    if (updatedFilters.location) {
      filtered = filtered.filter(lawyer => lawyer.location.includes(updatedFilters.location));
    }
    if (updatedFilters.rating > 0) {
      filtered = filtered.filter(lawyer => lawyer.rating >= updatedFilters.rating);
    }
    
    setFilteredLawyers(filtered);
  };

  const clearFilters = () => {
    setFilters({
      specialization: '',
      location: '',
      priceRange: '',
      language: '',
      rating: 0,
    });
    setFilteredLawyers(lawyers);
  };

  const value = {
    lawyers,
    filteredLawyers,
    selectedLawyer,
    loading,
    error,
    filters,
    setLawyers: updateLawyers,
    setFilteredLawyers,
    setSelectedLawyer,
    setLoading,
    setError,
    updateFilters,
    clearFilters,
  };

  return (
    <LawyersContext.Provider value={value}>
      {children}
    </LawyersContext.Provider>
  );
};