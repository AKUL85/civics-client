import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = 'খুঁজুন...', value = '', onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    if (onChange) onChange('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative transition-all duration-200 ${
        isFocused ? 'scale-105' : 'scale-100'
      }`}
      whileFocus={{ scale: 1.02 }}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <AnimatePresence>
          {value && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
};

export default SearchBar;